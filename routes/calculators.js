const express = require('express');
const models = require('../models');
const router = express.Router();
const Sequelize = require('sequelize');


const LIMIT = 20;


router.get('/', async (req, res, next) => {
    // if (req.userRole != "admin" || req.userRole != "payer") {
    //   return
    //   res.json({
    //     status: 403,
    //     "massige": "Access Denied"
    //   })
    // }
    console.log(req.userRole, 111111111);
    try {
        const page = req.query.page || 1;
        const calculators = await models.Calculators.findAll({
            offset: LIMIT * page - LIMIT,
            limit: LIMIT,
            include: [{
                model: models.Peoples,
                required: true
            }, {
                model: models.Types,
                required: true
            }]
        });
        const total = await models.Calculators.count();
        res.json({
            status: 'ok',
            calculators,
            page,
            total,
            totalPage: Math.ceil(total / LIMIT),
        })
    } catch (e) {
        next(e)
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const {id} = req.params;
        const calculator = await models.Calculators.findByPk(id, {
            include: [{
                model: models.Peoples,
                required: true
            }, {
                model: models.Types,
                required: true
            }]
        });
        res.json({
            status: 'ok',
            calculator,
        })
    } catch (e) {
        next(e)
    }
});


router.put('/', async (req, res, next) => {
    try {
        const {
            type_id,
            serial_number,
            address,
            people_id,
        } = req.body;
        const calculator = await models.Calculators.create({
            type_id,
            serial_number,
            address,
            people_id,
        });
        res.json({
            status: 'ok',
            calculator,
        })
    } catch (e) {
        next(e)
    }
});

router.post('/', async (req, res, next) => {
    try {
        const {
            id,
            type_id,
            serial_number,
            address,
            people_id,
        } = req.body;
        const calculator = await models.Calculators.update({
            type_id,
            serial_number,
            address,
            people_id,
        }, {where: {id}});
        res.json({
            status: 'ok',
            calculator: {
                id,
                type_id,
                serial_number,
                address,
                people_id,
            },
        })
    } catch (e) {
        next(e)
    }
});

router.delete('/', async (req, res, next) => {
    try {
        const {id} = req.body;
        await models.Calculators.destroy({where: {id}});
        res.json({
            status: 'ok',
        })
    } catch (e) {
        next(e)
    }
});


router.post('/search', async (req, res, next) => {
    try {
        const {search} = req.body;
        const searchForCategories =
            {
                $or:
                    [
                        {'serial_number': {$or: '%' + search + '%'}},
                        {'address': {$or: '%' + search + '%'}}
                    ]
            };

        const peopleData = await models.Utilities.findAll(
            {
                include: [
                    {
                        model: models.Calculators,
                        where: searchForCategories,

                        include: [
                            {model: models.Types},
                            {
                                model: models.Peoples,
                                // where: searchForPeoples,

                                include: [{model: models.Users,}]
                            },
                        ],
                    }
                ]
            }
        );

        const calculatorData =

            {
                "result": []
            };

        peopleData.push(calculatorData);

        console.log(peopleData);
        res.json({
            status: 'ok',
            peopleData
        })
    } catch (e) {
        next(e)
    }


});

router.put('/add', async (req, res, next) => {
    try {
        const {number, serial_number} = req.body;
        const calculators = await models.Calculators.findOne({
            where: {serial_number},
            include: [models.Types]
        });

        const dataOld = await models.Utilities.findOne({
            where: {calc_id: calculators.id,},
            order: [['create_date', 'DESC']],
        });

        console.log(dataOld);

        let debt;

        if (dataOld === null) {
            debt = calculators.type.price * number;
        } else {
            const numberDif = number - dataOld.number;
            debt = (calculators.type.price * numberDif);
            debt += dataOld.debt;
        }

        const utilities = await models.Utilities.create(
            {
                "calc_id": calculators.id,
                "number": number,
                "debt": debt,
                "create_date": new Date().toISOString(),
                "pay_date": null,
                "paid_price": 0,
                "create_user_id": req.userId,
                "payed_user_id": null,
            },
            {
                where: {"calc_id": calculators.id}
            },
        );

        res.json({
            status: 'ok',
            calculators,
            utilities
        })
    } catch (e) {
        next(e)
    }

});


router.put('/payer', async (req, res, next) => {
    try {
        const Op = Sequelize.Op;
        const {paid_price} = req.body;
        const {serial_number} = req.body;

        const calculators = await models.Calculators.findOne(
            {
                where:
                    {
                        [Op.or]:
                            [
                                {'serial_number': {[Op.like]: '%' + serial_number[0] + '%',}},
                            ]
                    },
            }
        );

        let utilities = await models.Utilities.findOne(
            {
                where: {'calc_id': calculators.id},
                order: [['create_date', 'DESC']],
            }
        );

        if (utilities === null) {
            res.json({
                status: 'error',
                'mesages': "",
            })
        }

        let debt = parseFloat(utilities.debt) - parseFloat(paid_price);

        await models.Utilities.update(
            {
                debt,
                paid_price,
                "pay_date": new Date().toISOString(),
                "payed_user_id": calculators.people_id,
            },
            {
                where: {"calc_id": calculators.id,},
                // order: ['create_date', 'DESC'],
                // limit: 1,
            }
        );

        utilities = await models.Utilities.findOne({
            where: {calc_id: calculators.id,},
            order: [['create_date', 'DESC']],
        });

        res.json({
            status: 'ok',
            calculators,
            utilities
        })

    } catch (e) {
        next(e)
    }


});


module.exports = router;