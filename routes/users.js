const express = require('express');
const models = require('../models');
const { jwtSecret } = require('../config');
const jwt = require('jsonwebtoken');
const md5 = require('md5');

const router = express.Router();

router.post('/login', async (req, res, next) => {
  try {

    const { username, password } = req.body;
    const user = await models.Users.findOne({
      where: {
        username,
        password: md5(password)
      }
    });
    if (user) {
      const token = jwt.sign({ userId: user.id }, jwtSecret);
      res.send({
        status: 'ok',
        token: token,
        user,
      })
    } else {
      res.status(401).send({
        status: 'error',
      })
    }
  } catch (e) {
    next(e)
  }
});

module.exports = router;

