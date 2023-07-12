const Sequelize = require("sequelize");
const database = require("../../../infra/db");

const Tag = database.define("Tag", {
  id: {
    type: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  productId: {
    type: Sequelize.UUIDV4,
    allowNull: false,
  },
});

Tag.sync();

module.exports = Tag;
