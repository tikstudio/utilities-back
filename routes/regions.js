const Sequelize = require('sequelize');
const models = require('../models');
const express = require('express');

const router = express.Router();

////////////+++++++++++++++++
router.get('/', async (req, res, next) => {
  try {


    const regions = await models.Regions.findAll();
    res.json({
      status: 'ok',
      regions,
    })
  } catch (e) {
    next(e)

  }
});

module.exports = router;
