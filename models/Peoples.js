const Sequelize = require('sequelize');
const sequelize = require('../services/database');
const Regions = require('./Regions');
const Users = require('./Users');
// const Calculators = require('./Calculators');

// const Utilities = require('./Utilities');

class Peoples extends Sequelize.Model {
    static async getPeoples(data) {
        const where = {};
        for (let key in data) {
            data[key] ? where[key] = data[key] : null
        }
        const user = await this.findOne({where});
        return user;
    }
}

Peoples.init({
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
    l_name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    m_name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    phone: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    passport: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: 'passport',
    },
    address: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    deleted: {
        type: Sequelize.ENUM('0', '1'),
        allowNull: false,
        defaultValue: '0',
    },

}, {
    sequelize,
    modelName: 'peoples',
    timestamps: false
});

Peoples.sync();

Peoples.belongsTo(Regions, {
    foreignKey: 'region_id',
});

Peoples.hasOne(Users, {
    foreignKey: 'people_id',
});

// Peoples.hasMany(Calculators, {
//     foreignKey: 'id',
//
//     sourceKey: 'people_id',
// });

module.exports = Peoples;
