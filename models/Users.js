const Sequelize = require('sequelize');
const sequelize = require('../services/database');
const md5 = require('md5');
const Region = require('./Region');

class Users extends Sequelize.Model {

    static async getUserType(data) {
        const user = await this.findOne({
            where: {
                username: data.login,
                password: data.password
            },
            attributes: ['type']
        });

        return user;
    }

}

Users.init({
    id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: 'username'
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        get() {
            return undefined
        },
        set(val) {
            return md5(val)
        }
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: 'email'

    },
    peopleId: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'people_id',
        key: 'people_id',
    },
    type: {
        type: Sequelize.STRING,
        allowNull: false
    },

    role: {
        type: Sequelize.ENUM('admin', 'manager', 'payer'),
        allowNull: false,
        defaultValue: 'payer',
    }

}, {
    sequelize,
    modelName: 'users',
    timestamps: false
});

Users.sync();


module.exports = Users;
