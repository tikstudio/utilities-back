const Sequelize = require('sequelize');
const sequelize = require('../services/database');

class Regions extends Sequelize.Model {

}

Regions.init({
    id: {
        type: Sequelize.TINYINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    region_name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
}, {
    sequelize,
    modelName: 'regions',
    timestamps: false
});

Regions.sync();



module.exports = Regions;
