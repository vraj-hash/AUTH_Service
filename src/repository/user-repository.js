const { User,Role } = require("../models/index");

class UserRepository {
  async create(data) {
    try {
      const user = await User.create(data);
      return user;
    } catch (error) {
      console.log("Something went wrong on repository");
      throw error;
    }
  }

  async destroy(userId) {
    try {
      const user = await User.destroy({
        where: {
          id: userId,
        },
      });
      return true;
    } catch (error) {
      console.log("Something went wrong on repository");
      throw error;
    }
  }

  async getById(userId) {
    try {
      const user = await User.findByPk(userId, {
        attributes: ["email", "id"],
      });
      return user;
    } catch (error) {
      console.log("Something went wrong on repository");
      throw error;
    }
  }

  async getByEmail(userEmail) {
    try {
      const user = await User.findOne({
        where: {
          email: userEmail,
        },
      });
      return user;
    } catch (error) {
      console.log("user does not present ");
      throw error;
    }
  }

  async isAdmin(userId) {
    try {
      const user = await User.findByPk(userId);
      // console.log(user);
      const adminRole = await Role.findOne({
        where: {
          name: 'ADMIN',
        }
      });
      console.log(adminRole);

      return user.hasRole(adminRole);
    } catch (error) {
      console.log("Something went wrong in user repository");
      throw error;
    }
  }
}

module.exports = UserRepository;
