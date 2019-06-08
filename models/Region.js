const Sequelize = require('sequelize');
const sequelize = require('../services/database');

class Region extends Sequelize.Model {

}

Region.init({
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
    modelName: 'region',
    timestamps: false
});

Region.sync();



module.exports = Region;
