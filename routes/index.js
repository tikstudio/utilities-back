const express = require('express');
const router = express.Router();
const Peoples = require('../models/Peoples');
const Users = require('../models/Users');
const PeoplesController = require('../controllers/PeoplesController');
const UsersController = require('../controllers/UsersController');

/* GET home page. */
router.get('/', async (req, res, next) => {

  const people = await Peoples.getByPassport('#adasdasdas');
  people.update({
    phone: 'test'
  });
  people.save();


  res.json({
    people
  });
});

router.post('/signIn', async (req, res, next) => {

  try{
    const user = await UsersController.signIn(req.body)
    res.json({
      status: 'ok',
      user
    });
  }catch(e){
    e.massage = 'user not found'
    res.json({
      e
    });
  }


});


router.post('/getPeoples', async (req, res, next) => {

  try{
    const user = await PeoplesController.getPeoples(req.body)
    res.json({
      status: 'ok',
      user
    });
  }catch(e){
    e.massage = 'user not found'
    res.json({
      e
    });
  }


});


router.put('/create', async (req, res, next) => {
  const status = await PeoplesController.create(res.body)
  res.json(status);
});

module.exports = router;
