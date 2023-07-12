const loginRepository = require("../repositories/login.repository");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

class LoginController {
  async login(req, res) {
    // #swagger.tags = ["Auth"]
    // #swagger.description = "Endpoint para login de usuários."

    /* #swagger.parameters['Credentials'] = { 
        in: 'body',
        description: "Autenticando um usuário.",
        schema: { $ref: "#/definitions/UserCredentials" }
    } */
    const { email, password } = req.body;

    try {
      const user = await loginRepository.findByEmail(email);

      if (!user) {
        /* #swagger.responses[404] = { 
            description: "Usuário não encontrado." 
        } */
        return res.status(404).json({
          message: "Usuário não encontrado!",
        });
      }

      if (!(await bcrypt.compare(password, user.password))) {
        /* #swagger.responses[401] = {
            description: "Senha incorreta."
        } */
        return res.status(401).json({
          message: "Senha incorreta!",
        });
      }

      const token = jwt.sign(
        {
          userId: user.id,
          email,
        },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );

      /* #swagger.responses[200] = { 
            description: "Usuário autenticado com succeso." 
        } */
      return res.status(200).json({
        user: {
          ...user.dataValues,
          password: null,
        },
        token,
      });
    } catch (error) {
      /* #swagger.responses[500] = { 
          description: "Problemas com o servidor." 
      } */
      return res.status(500).json(error);
    }
  }
}

module.exports = new LoginController();
