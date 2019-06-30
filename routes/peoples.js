const express = require('express');
const models = require('../models');
const router = express.Router();
const Sequelize = require('sequelize');
const LIMIT = 20;
//////////////++++++++++++++++++
router.get('/', async (req, res, next) => {
    try {
        const page = req.query.page || 1;
        const peoples =
            await models.Peoples.findAll(
                {
                    offset: LIMIT * page - LIMIT,
                    limit: LIMIT,
                    include:
                        [{model: models.Regions}],
                }
            );
        const total = await models.Peoples.count();
        res.json({
            status: 'ok',
            peoples,
            page,
            total,
            totalPage: Math.ceil(total / LIMIT),
        })
    } catch (e) {
        next(e)
    }
});

///////////+++++++++++++++
router.get('/details', async (req, res, next) => {
    try {
        const id = req.param('id');
        console.log(id);
        const people = await models.Peoples.findByPk(id);

        if (people === null) {
            res.status(404).json({
                status: 'not_found',
            });
        }

        const calculators = await models.Calculators.findAll({
            where: {"people_id": people.id},
            include: [
                {model: models.Types},
                {model: models.Utilities},
                // {
                //     model: models.Utilities,
                //     where: 'utilities.calc_id= id'
                // }

            ]
        });


        //
        // let utilities = await models.Utilities.findAll(
        //     {
        //         where: {'calc_id': calculators.id},
        //         order: [['create_date', 'DESC']],
        //     }
        // );

        console.log(calculators);

        res.json({
            status: 'ok',
            people,
            calculators,
        });

        res.status(404).json({
            status: 'not_found',
        })

    } catch (e) {
        next(e)
    }
});

////////////++++++++++++++++
router.put('/', async (req, res, next) => {
    try {
        const {
            name,
            l_name,
            m_name,
            phone,
            passport,
            region_id,
            address,
        } = req.body;
        const people = await models.Peoples.create({
            name,
            l_name,
            m_name,
            phone,
            passport,
            region_id,
            address,
        });
        res.json({
            status: 'ok',
            people,
        })
    } catch (e) {
        next(e)
    }
});
/////////++++++++++++++++
router.post('/', async (req, res, next) => {
    try {
        const {
            id,
            name,
            l_name,
            m_name,
            phone,
            passport,
            region_id,
            address,
        } = req.body;
        const people = await models.Peoples.update({
            name,
            l_name,
            m_name,
            phone,
            passport,
            region_id,
            address,
        }, {where: {id}});
        res.json({
            status: 'ok',
            peoples: {
                id,
                name,
                l_name,
                m_name,
                phone,
                passport,
                region_id,
                address,
            },
        })
    } catch (e) {
        next(e)
    }
});
///////++++++++++++++
router.delete('/', async (req, res, next) => {
    try {
        const paramId = req.param('id');
        await models.Peoples.destroy({
            where: {
                "id": paramId
            }
        });
        res.json({
            status: 'ok',
        })
    } catch (e) {
        next(e)
    }
});
////////////+++++++++++++++++++++++
router.post('/search', async (req, res, next) => {
    const Op = Sequelize.Op;
    console.log(req.userRole);
    const search = req.param('search');
    console.log(search,5555555555555555);

    try {
        const people = await models.Peoples.findAll(
            {
                where:
                    {
                        [Op.or]:
                            [
                                {
                                    'name':
                                        {
                                            [Op.like]: '%' + search + '%',
                                        },
                                },
                                {
                                    'l_name':
                                        {
                                            [Op.like]: '%' + search + '%',
                                        }
                                },
                                {
                                    'm_name':
                                        {
                                            [Op.like]: '%' + search + '%',
                                        }
                                },
                                {
                                    'phone':
                                        {
                                            [Op.like]: '%' + search + '%',
                                        }
                                },
                                {
                                    'passport':
                                        {
                                            [Op.like]: '%' + search + '%',
                                        }
                                },
                                {
                                    'region_id':
                                        {
                                            [Op.like]: '%' + search + '%',
                                        }
                                },
                                {
                                    'address':
                                        {
                                            [Op.like]: '%' + search + '%',
                                        }
                                }
                            ]
                    },
                include: [models.Regions]
            }
        );
        console.log(people);
        res.json({
            status: 'ok',
            people
        })
    } catch (e) {
        next(e)
    }


});

module.exports = router;