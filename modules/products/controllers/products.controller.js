const productsRepository = require("../repositories/products.repository");

class ProductsController {
  async findAll(req, res) {
    // #swagger.tags = ["Products"]
    // #swagger.description = "Endpoint para obter a lista de produtos."

    try {
      const products = await productsRepository.findAll();

      /* #swagger.responses[200] = { 
          schema: { $ref: "#/definitions/Products" },
          description: "Lista de produtos encontrada." 
      } */
      return res.status(200).json(products);
    } catch (error) {
      /* #swagger.responses[500] = { 
          description: "Problemas com o servidor." 
      } */
      return res.status(500).json(error);
    }
  }

  async findById(req, res) {
    // #swagger.tags = ["Products"]
    // #swagger.description = "Endpoint para obter um produto."

    // #swagger.parameters['id'] = { description: "Id do produto" }
    const { id } = req.params;

    try {
      const product = await productsRepository.findOne(id);

      if (!product) {
        /* #swagger.responses[404] = { 
            description: "Produto não encontrado." 
        } */
        return res.status(404).json();
      }

      /* #swagger.responses[200] = { 
          schema: { $ref: "#/definitions/Product" },
          description: "Produto encontrado." 
      } */
      return res.json(product);
    } catch (error) {
      /* #swagger.responses[500] = { 
          description: "Problemas com o servidor." 
      } */
      return res.status(500).json(error);
    }
  }

  async create(req, res) {
    // #swagger.tags = ["Products"]
    // #swagger.description = "Endpoint para cadastrar um produto."

    /* #swagger.parameters['Product'] = { 
        in: 'body',
        description: "Adicionando um novo produto.",
        schema: { $ref: "#/definitions/AddProduct" }
    } */
    const product = req.body;

    try {
      productsRepository.create(product);

      /* #swagger.responses[201] = { 
          description: "Produto cadastrado." 
      } */
      return res.status(201).json();
    } catch (error) {
      /* #swagger.responses[500] = { 
          description: "Problemas com o servidor." 
      } */
      return res.status(500).json(error);
    }
  }

  async update(req, res) {
    // #swagger.tags = ["Products"]
    // #swagger.description = "Endpoint para atualizar um produto."

    // #swagger.parameters['id'] = { description: "Id do produto" }
    const { id } = req.params;

    /* #swagger.parameters['Product'] = { 
        in: 'body',
        description: "Adicionando um novo produto.",
        schema: { $ref: "#/definitions/Product" }
    } */
    const product = req.body;

    try {
      productsRepository.update(id, product);

      /* #swagger.responses[204] = { 
          description: "Produto atualizado com sucesso." 
      } */
      return res.status(204).json();
    } catch (error) {
      /* #swagger.responses[500] = { 
          description: "Problemas com o servidor." 
      } */
      return res.status(500).json(error);
    }
  }

  async delete(req, res) {
    // #swagger.tags = ["Products"]
    // #swagger.description = "Endpoint para remover um produto."

    // #swagger.parameters['id'] = { description: "Id do produto" }
    const { id } = req.params;

    try {
      productsRepository.delete(id);

      /* #swagger.responses[204] = { 
          description: "Produto removido com sucesso." 
      } */
      return res.status(204).json();
    } catch (error) {
      /* #swagger.responses[500] = { 
          description: "Problemas com o servidor." 
      } */
      return res.status(500).json(error);
    }
  }
}

module.exports = new ProductsController();
