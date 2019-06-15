const Sequelize = require('sequelize');
const sequelize = require('../services/database');
// const Region = require('./Region');
const Calculators = require('./Calculators');
// const Users = require('./Users');


class Utilities extends Sequelize.Model {

}

Utilities.init({
    id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    calc_id: {
        type: Sequelize.BIGINT,
        allowNull: false
    },
    number: {
        type: Sequelize.BIGINT,
        allowNull: false,
    },
    create_date: {
        type: Sequelize.BIGINT,
        allowNull: false,
    },
    pay_date: {
        type: Sequelize.BIGINT,
        allowNull: false,
    },
    debt: {
        type: Sequelize.BIGINT,
        allowNull: false,
    },
    payed: {
        type: Sequelize.BIGINT,
        allowNull: false,
        unique: 'passport',
    },
    create_user_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
    },
    payed_user_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
    },

}, {
    sequelize,
    modelName: 'utilites',
    timestamps: false
});

Utilities.belongsTo(Calculators, {
    foreignKey: 'calc_id',
});

// Utilities.belongsTo(Users, {
//     foreignKey: 'create_user_id',
// });

Utilities.sync();

module.exports = Utilities;
