const database = require("../../../infra/db");
const Product = require("../models/product.model");
const { v4: uuidv4 } = require("uuid");
const Tag = require("../models/tag.model");

class ProductsRepository {
  async findAll() {
    await database.sync();
    const products = await Product.findAll({
      include: [
        {
          model: Tag,
          as: "tags",
        },
      ],
    });
    return products;
  }

  async findOne(id) {
    await database.sync();
    const product = await Product.findOne({
      where: {
        id,
      },
      include: [
        {
          model: Tag,
          as: "tags",
        },
      ],
    });
    return product;
  }

  async create(productP) {
    try {
      await database.sync();
      const { tags, ...product } = productP;
      const createdProduct = await Product.create({ ...product, id: uuidv4() });

      tags.forEach(async (tag) => {
        await Tag.create({
          id: uuidv4(),
          name: tag,
          productId: createdProduct.id,
        });
      });

      return createdProduct;
    } catch (error) {
      console.log(error);
    }
  }

  async update(id, product) {
    try {
      await database.sync();
      const updatedProduct = await Product.update(product, {
        where: {
          id,
        },
      });
      return updatedProduct;
    } catch (error) {
      console.log(error);
    }
  }

  async delete(id) {
    try {
      await database.sync();

      await Product.destroy({
        where: {
          id,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new ProductsRepository();
