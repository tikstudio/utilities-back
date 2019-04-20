const Sequelize = require('sequelize');


class Calculators extends Sequelize.Model {
    async getByPassport(passport) {
        const user = await this.findOne({passport});
        return user;
    }
}

Calculators.init({
    id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },

    people_id: {
        type:Sequelize.BIGINT,
        allowNull: false,
    },

    type_id : {
        type:Sequelize.BIGINT,
        allowNull: false
    },

    serial_number: {
        type: Sequelize.STRING,
        allowNull: false
    },
    address:{
        type: Sequelize.STRING,
        allowNull: false
    },

    deleted: {
        type: Sequelize.ENUM('0', '1'),
        allowNull: false,
        defaultValue: '0',
        primaryKey: true,

    },



});


Calculators.sync();

module.exports = Calculators;