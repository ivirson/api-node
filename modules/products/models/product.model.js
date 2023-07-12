const Sequelize = require("sequelize");
const database = require("../../../infra/db");
const Tag = require("./tag.model");

const Product = database.define("Product", {
  id: {
    type: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  qty: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  image: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

Product.hasMany(Tag, {
  as: "tags",
  foreignKey: {
    allowNull: false,
    name: "productId",
  },
  onDelete: "cascade",
  hooks: true,
});

Tag.belongsTo(Product);

Product.sync();

module.exports = Product;
