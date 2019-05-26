const Peoples = require('../models/Peoples');

PeoplesController = {};

PeoplesController.getPeoples  = async (body) => {
    const {data} = body;
    return await Peoples.getPeoples(data);
}

module.exports = PeoplesController;
