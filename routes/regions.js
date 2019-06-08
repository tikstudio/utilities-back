const express = require('express');
const models = require('../models');


router.get('/', async (req, res, next) => {
    try {
        const { id } = req.params;
        const region = await models.Region.findByPk(id);
        if(region){
            res.json({
                status: 'ok',
                region,
            })
        }else{
            res.status(404).json({
                status: 'not_region',
            })
        }

    } catch (e) {
        next(e)
    }

});
