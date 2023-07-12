const database = require("../../../infra/db");
const User = require("../models/user.model");

class LoginRepository {
  async findByEmail(email) {
    await database.sync();
    const user = await User.findOne({
      where: {
        email,
      },
    });
    return user;
  }
}

module.exports = new LoginRepository();
