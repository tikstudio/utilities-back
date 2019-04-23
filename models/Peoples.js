const Sequelize = require('sequelize');
const sequelize = require('../services/database');

class Peoples extends Sequelize.Model {
  static async getPeoples(data) {
    const where = {}
    for(let key in data){
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
  lName: {
    type: Sequelize.STRING,
    allowNull: false,
    field: 'l_name',
  },
  mName: {
    type: Sequelize.STRING,
    allowNull: false,
    field: 'm_name',
  },
  phone: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  passport: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: 'passport'
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

module.exports = Peoples;
