import CartRepository from "../repositories/Cart-repository.js";
import UserRepository from "../repositories/User-repository.js";
import { getUserFromMail } from "../middlewares/functions.js";
class UserService {
  constructor() {
    this.userRepository = new UserRepository();
    this.cartRepository = new CartRepository();
  }

  async createUser(User) {
    try {
      const user = await this.userRepository.create(User);
      const cartId = user.cart;
      const token = await user.genJwt(user);
      return { token, cartId };
    } catch (error) {
      console.log("Something went wrong in Service layer");
      console.log(error);
    }
  }

  async getUsers() {
    try {
      const users = await this.userRepository.getAll();
      return users;
    } catch (error) {
      console.log("Something went wrong in Service layer");
      console.log(error);
    }
  }

  async getUserById(id) {
    return await this.userRepository.getById(id);
  }

  async updateUser(id, user) {
    return await this.userRepository.update(id, user);
  }
  async login(email, password) {
    try {
      const user = await this.userRepository.findOne({ email: email });
      if (!user) {
        throw {
          message: "Incorrect email",
        };
      }
      if (!user.comparePassword(password)) {
        throw {
          message: "Incorrect password",
        };
      }

      const token = await user.genJwt(user);

      const cartId = user.cart;
      return { token, cartId };
    } catch (error) {
      console.log("Something went wrong in  hService layer", error);
      throw error;
    }
  }
  async addAddress(userEmail, address) {
    try {
      const addresses = await this.userRepository.addAddress(
        userEmail,
        address
      );
      return addresses;
    } catch (error) {
      console.log("Something went wrong in Service b layer");
      throw error;
    }
  }
  async getAddress(userEmail) {
    try {
      const addresses = await this.userRepository.getAddresses(userEmail);
      return addresses;
    } catch (error) {
      console.log("Something went wrong in Service b layer");
      throw error;
    }
  }
  async getUserInfo(email) {
    try {
      const user = await getUserFromMail(email);
      return user;
    } catch (error) {
      console.log("Something went wrong in Service  layer", error);
      throw error;
    }
  }

  async removeAddress(email, index) {
    try {
      const addresses = await this.userRepository.removeAddress(email, index);
      return addresses;
    } catch (error) {
      console.log("Something went wrong in Service layer");
      throw error;
    }
  }
  async editAddress(email, address, index) {
    try {
      const addresses = await this.userRepository.editAddress(
        email,
        address,
        index
      );
      return addresses;
    } catch (error) {
      console.log("Something went wrong in Service layer");
      throw error;
    }
  }
}

export default UserService;
