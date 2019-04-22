const Users = require('../models/Users');

UsersController = {};

UsersController.signIn = async (body) => {
    const {data} = body;
    return await Users.getUserType(data);
}

module.exports = UsersController;