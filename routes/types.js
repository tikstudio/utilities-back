const express = require('express');
const models = require('../models');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const types = await models.Types.findAll();
    res.json({
      status: 'ok',
      types,
    })
  } catch (e) {
    next(e)
  }
});

module.exports = router;

