const express = require('express');
const models = require('../models');
const router = express.Router();
const Sequelize = require('sequelize');
const LIMIT = 20;

router.get('/', async (req, res, next) => {
  try {
    const page = req.query.page || 1;
    const peoples = await models.Peoples.findAll({
      offset: LIMIT * page - LIMIT,
      limit: LIMIT,
    });
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

router.get('/:id', async (req, res, next) => {
  try {
    const {id} = req.params;
    const people = await models.Peoples.findByPk(id);
    if (people) {
      res.json({
        status: 'ok',
        people,
      })
    } else {
      res.status(404).json({
        status: 'not_found',
      })
    }

  } catch (e) {
    next(e)
  }
});


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

router.post('/search', async (req, res, next) => {
  const Op = Sequelize.Op;
  console.log(req.userRole);
  const search = req.param('search');

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
        include: [models.Region]
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