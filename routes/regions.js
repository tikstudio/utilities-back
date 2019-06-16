const Sequelize = require('sequelize');
const models = require('../models');


router.get('/', async (req, res, next) => {
  try {

    const regions = models.Region.findAll({

    })
    res.json({
      status: 'ok',
      regions,
    })
  } catch (e) {
    next(e)

  }
});