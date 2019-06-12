const express = require('express');
const models = require('../models');
const {jwtSecret} = require('../config');
const jwt = require('jsonwebtoken');
const md5 = require('md5');

const router = express.Router();

router.post('/login', async (req, res, next) => {
  try {
    const {username, password} = req.body;
    if (username && password) {
      const user = await models.Users.findOne({
        where: {
          username: username,
          password: md5(password)
        }
      });
      if (user) {
        const token = jwt.sign({userId: user.id, userRole: user.role}, jwtSecret);
        return res.send({
          status: 'ok',
          token: token,
          user,
        })
      }

    }

    res.status(401).send({
      status: 'error',
      message: 'Invalid username or password'
    })
  } catch (e) {
    next(e)
  }
});

module.exports = router;