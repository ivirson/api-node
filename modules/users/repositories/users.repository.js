const database = require("../../../infra/db");
const Address = require("../models/address.model");
const User = require("../models/user.model");
const { v4: uuidv4 } = require("uuid");

class UsersRepository {
  async findAll() {
    await database.sync();
    let users = await User.findAll({
      include: [
        {
          model: Address,
          as: "address",
        },
      ],
    });
    return users;
  }

  async findOne(id) {
    await database.sync();
    const user = await User.findOne({
      where: {
        id,
      },
      include: [
        {
          model: Address,
          as: "address",
        },
      ],
    });
    return user;
  }

  async create(userP) {
    await database.sync();

    const { address, ...user } = userP;

    user.id = uuidv4();
    const createdUser = await User.create(user);

    await Address.create({
      ...address,
      id: uuidv4(),
      userId: createdUser.dataValues.id,
    });
  }

  async update(id, userP) {
    await database.sync();

    const { address, ...user } = userP;

    await User.update(user, {
      where: {
        id,
      },
    });

    await Address.update(address, {
      where: {
        userId: user.id,
      },
    });
  }

  async delete(id) {
    await database.sync();

    await User.destroy({
      where: {
        id,
      },
    });
  }
}

module.exports = new UsersRepository();
