const Sequelize = require('sequelize');
const sequelize = require('../services/database');
const Calculators = require('./Calculators');
class Utilities extends Sequelize.Model {

}

Utilities.init({
  id: {
    type: Sequelize.BIGINT,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  number: {
    type: Sequelize.BIGINT,
    allowNull: true,
  },
  debt: {
    type: Sequelize.BIGINT,
    allowNull: true,
  },
  create_date: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  pay_date: {
    type: Sequelize.STRING,
    //   type: Sequelize.DATE,
    allowNull: true,
      // defaultValue: Sequelize.NOW,
      // isDate: true,
  },
  paid_price: {
    type: Sequelize.BIGINT,
    allowNull: true,
  },
  create_user_id: {
    type: Sequelize.BIGINT,
    allowNull: true,
  },
  payed_user_id: {
    type: Sequelize.BIGINT,
    allowNull: true,
  },

}, {
  sequelize,
  modelName: 'utilites',
  timestamps: false
});


Utilities.belongsTo(Calculators, {
  foreignKey: 'calc_id',
});

Utilities.sync();

module.exports = Utilities;