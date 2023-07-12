const Sequelize = require("sequelize");
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "../backend/infra/database.sqlite"
})

module.exports = sequelize;