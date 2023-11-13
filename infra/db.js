const Sequelize = require("sequelize");
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "../api-node/infra/database.sqlite",
});

module.exports = sequelize;
