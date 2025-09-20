const UserRepository = require("../repository/user-repository");
const jwt = require("jsonwebtoken");
const { JWT_KEY } = require("../config/server-config");
const bcrypt = require("bcrypt");

class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }
  async create(data) {
    try {
      const user = await this.userRepository.create(data);
      return user;
    } catch (error) {
      console.log("Something went wrong in service ");
      throw error;
    }
  }

  createToken(user) {
    try {
      const result = jwt.sign(user, JWT_KEY, { expiresIn: "1d" });
      return result;
    } catch {
      console.log("Something went wrong while creating the token");
      throw error;
    }
  }

  verifyToken(token) {
    try {
      const response = jwt.verify(token, JWT_KEY);
      return response;
    } catch (error) {
      console.log("Something went wrong while verifying the token", error);
      throw error;
    }
  }

  async signIn(email, plainPassword) {
    try {
      //step 1 fetch the user by email
      const user = await this.userRepository.getByEmail(email);
      //step-2 compare incoming passward with stores encryted pass
      const passwordMatch = this.checkPassword(plainPassword, user.password);

      if (!passwordMatch) {
        console.log("password does not match");
        throw { error: "incorrect password" };
      }
      // step 3 if pass match create token
      const newJWT = this.createToken({ email: user.email, id: user.id });

      return newJWT;
    } catch (error) {
      console.log("Something went wrong in the signin process");
      throw error;
    }
  }

  async isAuthenticated(token) {
    try {
      const response = this.verifyToken(token);
      if (!response) {
        throw { error: "Invalid token" };
      }

      const user = await this.userRepository.getById(response.id);
      if (!user) {
        throw { error: "No user with the corresponding token exists" };
      }
      return user.id;
    } catch (error) {
      console.log("Something went wrong in the Auth  process");
      throw error;
    }
  }

  checkPassword(userInputPlainPassword, encryptedPassword) {
    try {
      return bcrypt.compareSync(userInputPlainPassword, encryptedPassword);
    } catch (error) {
      console.log("Something went wrong while passwrod comparison");
      throw error;
    }
  }

  isAdmin(userId) {
    try {
      return this.userRepository.isAdmin(userId);
    } catch (error) {
      console.log("Something went wrong while service layer");
      throw error;
    }
  }
}

module.exports = UserService;
