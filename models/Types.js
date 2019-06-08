const Sequelize = require('sequelize');
const sequelize = require('../services/database');

class Types extends Sequelize.Model {
    async getByPassport(passport) {
        const user = await this.findOne({passport});
        return user;
    }
}

Types.init({
    id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },

    name: {
        type: Sequelize.STRING,
        allowNull: false
    },

    short_name: {
        type: Sequelize.STRING,
        allowNull: false
    },

    unit: {
        type: Sequelize.STRING,
        allowNull: false
    },

    price: {
        type: Sequelize.FLOAT(7, 4),
        allowNull: false
    },

}, {
    sequelize,
    modelName: 'types',
    timestamps: false
});


Types.sync();

module.exports = Types;
