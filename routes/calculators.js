const express = require('express');
const models = require('../models');
const router = express.Router();

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
    const { id } = req.params;
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
    }, { where: { id } });
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
    const { id } = req.body;
    await models.Calculators.destroy({ where: { id } });
    res.json({
      status: 'ok',
    })
  } catch (e) {
    next(e)
  }
});

module.exports = router;

