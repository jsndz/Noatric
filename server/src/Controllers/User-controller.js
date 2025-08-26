import UserService from "../services/User-services.js";

async function createUser(req, res) {
  try {
    const userService = new UserService();

    const user = await userService.createUser(req.body);

    return res.status(201).json({
      data: user,
      success: true,
      message: "successfully created a user1",
      err: {},
    });
  } catch (error) {
    return res.status(500).json({
      data: {},
      success: false,
      message: "couldn't create user",
      err: error.message,
    });
  }
}

const LoginUser = async (req, res) => {
  try {
    const userService = new UserService();
    const user = await userService.login(req.body.email, req.body.password);

    return res.status(201).json({
      data: user,
      message: "Successfully found User",
      success: true,
      err: {},
    });
  } catch (error) {
    res.status(500).json({
      data: {},
      message: "Couldn't find User",
      success: false,
      err: error.message,
    });
  }
};

const addAddress = async (req, res) => {
  try {
    const userService = new UserService();
    const updatedAddress = await userService.addAddress(
      req.user.email,
      req.body
    );
    return res.status(201).json({
      data: updatedAddress,
      message: "Successfully added address",
      success: true,
      err: {},
    });
  } catch (error) {
    res.status(500).json({
      data: {},
      message: "Couldn't add address",
      success: false,
      err: error.message,
    });
  }
};

const getAddresses = async (req, res) => {
  try {
    const userService = new UserService();
    const addresses = await userService.getAddress(req.user.email);
    return res.status(201).json({
      data: addresses,
      message: "Successfully got address",
      success: true,
      err: {},
    });
  } catch (error) {
    res.status(500).json({
      data: {},
      message: "Couldn't get address",
      success: false,
      err: error.message,
    });
  }
};

const getUserInfo = async (req, res) => {
  try {
    const userService = new UserService();
    const user = await userService.getUserInfo(req.user.email);
    return res.status(201).json({
      data: user,
      message: "Successfully got user info",
      success: true,
      err: {},
    });
  } catch (error) {
    res.status(500).json({
      data: {},
      message: "Couldn't get user info",
      success: false,
      err: error.message,
    });
  }
};

const removeAddress = async (req, res) => {
  try {
    const userService = new UserService();
    const updatedAddress = await userService.removeAddress(
      req.user.email,
      req.params.index
    );
    return res.status(201).json({
      data: updatedAddress,
      message: "Successfully removed address",
      success: true,
      err: {},
    });
  } catch (error) {
    res.status(500).json({
      data: {},
      message: "Couldn't remove address",
      success: false,
      err: error.message,
    });
  }
};
const editAddress = async (req, res) => {
  try {
    const userService = new UserService();
    const updatedAddress = await userService.editAddress(
      req.user.email,
      req.body,
      req.params.index
    );
    return res.status(201).json({
      data: updatedAddress,
      message: "Successfully edited address",
      success: true,
      err: {},
    });
  } catch (error) {
    res.status(500).json({
      data: {},
      message: "Couldn't edit address",
      success: false,
      err: error.message,
    });
  }
};

const editName = async (req, res) => {
  try {
    const userService = new UserService();
    const name = req.params.name;
    const user = await userService.editName(req.user.email, name);
    return res.status(201).json({
      data: user,
      message: "Successfully changed name",
      success: true,
      err: {},
    });
  } catch (error) {
    res.status(500).json({
      data: {},
      message: "Couldn't changed name",
      success: false,
      err: error.message,
    });
  }
};

export {
  createUser,
  LoginUser,
  addAddress,
  getAddresses,
  getUserInfo,
  removeAddress,
  editAddress,
  editName,
};
