const Sequelize = require('sequelize');
const sequelize = require('../services/database');
const Peoples = require('./Peoples');
const Types = require('./Types');


class Calculators extends Sequelize.Model {

}

Calculators.init({
  id: {
    type: Sequelize.BIGINT,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },

  type_id: {
    type: Sequelize.BIGINT,
    allowNull: false
  },

  serial_number: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "Serial Number is Required"
      },
      is: {
        msg: "No Valid serial Number",
        args: /^[a-z0-9]+$/i,
      },
    }
  },
  address: {
    type: Sequelize.STRING,
    allowNull: false
  },

  price: {
    type: Sequelize.BIGINT,
    allowNull: false
  },

  deleted: {
    type: Sequelize.ENUM('0', '1'),
    allowNull: false,
    defaultValue: '0',
    primaryKey: true

  },
}, {
  sequelize,
  modelName: 'calculators',
  timestamps: false
});

Calculators.belongsTo(Peoples, {
  foreignKey: 'people_id',
});

Calculators.belongsTo(Types, {
  foreignKey: 'type_id',
});

Calculators.sync();

module.exports = Calculators;
