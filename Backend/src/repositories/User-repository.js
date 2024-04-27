import CrudRepository from "./Crud-repository.js";
import User from "../models/User.js";

class UserRepository extends CrudRepository {
  constructor() {
    super(User);
  }
  createUser = async (user) => {
    try {
      const result = await User.create(user);
      return result;
    } catch (error) {
      console.log("Something went wrong in the crud layer");
      throw { error };
    }
  };
  addAddress = async (email, address) => {
    try {
      const user = await User.findOne({ email: email });
      user.addresses.push(address);
      await user.save();
      return user.addresses;
    } catch (error) {
      console.log("Something went wrong in the crud layer");
      throw { error };
    }
  };
  getCartId = async (userId) => {
    try {
      const user = await User.findById(userId);
      return user.cart;
    } catch (error) {
      console.log("Something went wrong in the crud layer");
      throw { error };
    }
  };
  getAddresses = async (email) => {
    try {
      const user = await User.findOne({ email: email });
      if (!user) {
        throw new Error("User not found");
      }
      return user.addresses;
    } catch (error) {
      console.log("Something went wrong in the crud layer");
      throw error;
    }
  };
  removeAddress = async (email, index) => {
    try {
      const user = await User.findOne({ email: email });
      user.addresses.splice(index, 1);
      user.save();
      return user.addresses;
    } catch (error) {
      console.log("Something went wrong in the crud layer");
      throw error;
    }
  };
  editAddress = async (email, address, index) => {
    try {
      const user = await User.findOne({ email: email });

      user.addresses[index] = address;
      await user.save();
      return user.addresses;
    } catch (error) {
      console.log("Something went wrong in the crud layer");
      throw error;
    }
  };
}
export default UserRepository;
