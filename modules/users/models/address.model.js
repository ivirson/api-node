const Sequelize = require("sequelize");
const sequelize = require("../../../infra/db");

const Address = sequelize.define("Address", {
  id: {
    type: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  zipCode: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  street: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  number: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  complement: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  neighborhood: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  city: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  state: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  userId: {
    type: Sequelize.UUIDV4,
    allowNull: false,
  },
});

Address.sync();

module.exports = Address;
