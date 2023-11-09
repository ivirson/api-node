const usersRepository = require("../repositories/users.repository");
const bcrypt = require("bcryptjs");

class UsersController {
  async findAll(req, res) {
    // #swagger.tags = ["Users"]
    // #swagger.description = "Endpoint para obter a lista de usuários."
    try {
      const users = await usersRepository.findAll();

      /* #swagger.responses[200] = { 
          schema: { $ref: "#/definitions/Users" },
          description: "Lista de usuários encontrada." 
      } */
      return res.status(200).json(users);
    } catch (error) {
      /* #swagger.responses[500] = { 
          description: "Problemas com o servidor." 
      } */
      return res.status(500).json(error);
    }
  }

  async findById(req, res) {
    // #swagger.tags = ["Users"]
    // #swagger.description = "Endpoint para obter um usuário."

    // #swagger.parameters['id'] = { description: "Id do usuário" }
    const { id } = req.params;

    try {
      const user = await usersRepository.findOne(id);

      if (!user) {
        /* #swagger.responses[404] = { 
            description: "Usuário não encontrado." 
        } */
        return res.status(404).json();
      }

      /* #swagger.responses[200] = { 
          schema: { $ref: "#/definitions/User" },
          description: "Usuário encontrado." 
      } */
      return res.json(user);
    } catch (error) {
      /* #swagger.responses[500] = { 
          description: "Problemas com o servidor." 
      } */
      return res.status(500).json(error);
    }
  }

  async create(req, res) {
    // #swagger.tags = ["Users"]
    // #swagger.description = "Endpoint para cadastrar um usuário."

    /* #swagger.parameters['User'] = { 
        in: 'body',
        description: "Adicionando um novo usuário.",
        schema: { $ref: "#/definitions/AddUser" }
    } */
    const user = req.body;

    try {
      const encryptedPassword = await bcrypt.hash(user.password, 10);
      usersRepository.create({ ...user, password: encryptedPassword });

      /* #swagger.responses[201] = { 
          description: "Usuário cadastrado." 
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
    // #swagger.tags = ["Users"]
    // #swagger.description = "Endpoint para atualizar um usuário."

    // #swagger.parameters['id'] = { description: "Id do usuário" }
    const { id } = req.params;

    /* #swagger.parameters['User'] = { 
        in: 'body',
        description: "Adicionando um novo usuário.",
        schema: { $ref: "#/definitions/User" }
    } */
    const user = req.body;

    try {
      const userExist = await usersRepository.findOne(id);

      if (!userExist) {
        /* #swagger.responses[404] = { 
            description: "Usuário não encontrado." 
        } */
        return res.status(404).json();
      }

      if (
        user.password &&
        !(await bcrypt.compare(user.password, userExist.password))
      ) {
        user.password = await bcrypt.hash(user.password, 10);
      }

      if (!user.password) {
        user.password = userExist.password;
      }

      usersRepository.update(id, user);

      /* #swagger.responses[204] = { 
          description: "Usuário atualizado com sucesso." 
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
    // #swagger.tags = ["Users"]
    // #swagger.description = "Endpoint para remover um usuário."

    // #swagger.parameters['id'] = { description: "Id do usuário" }
    const { id } = req.params;

    try {
      const userExist = await usersRepository.findOne(id);

      if (!userExist) {
        /* #swagger.responses[404] = { 
            description: "Usuário não encontrado." 
        } */
        return res.status(404).json();
      }

      usersRepository.delete(id);

      /* #swagger.responses[204] = { 
          description: "Usuário removido com sucesso." 
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

module.exports = new UsersController();
