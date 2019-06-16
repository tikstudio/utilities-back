const express = require('express');
const models = require('../models');
const router = express.Router();
const Sequelize = require('sequelize');


const LIMIT = 20;

router.get('/', async (req, res, next) => {
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
    //todo get calculator type

    const calc = await models.Calculators.findOne({
      where: {
        serial_number
      },
      include: [models.Types]
    });

    const dataOld = await models.Utilities.findOne({
      where: {
        calc_id: calc.id
      },
      order: [
        ['create_date', 'DESC'],
      ],
    });
    let debt;

    if (dataOld) {
      const numberDif = dataOld.number - number;
      debt = (calc.type.price * numberDif) + dataOld.debt;
    } else {
      debt = calc.type.price * number
    }

    const utilities = await models.Utilities.create(
      {
        "calc_id": calc.id,
        "number": number,
        "debt": debt,
        "pay_date": null,
        "paid_price": 0,
        "create_user_id": req.userId,
        "payed_user_id": null,
      }
    );

    res.json({
      status: 'ok',
      utilities
    })
  } catch (e) {
    next(e)
  }


});


module.exports = router;

