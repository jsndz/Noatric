import User from "../models/User.js";
export const createUser = async (req, res) => {
  try {
    console.log("Before user creation");
    const user = await User.create(req.body);
    console.log("After user creation");

    return res.status(201).json({
      id: user.id,
      role: user.role,
      data: user,
      message: "Successfully created User",
      success: true,
      err: {},
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      data: {},
      message: "Couldn't create User",
      success: false,
      err: { error },
    });
  }
};

export const LoginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    const token = await user.genJwt(user);

    if (!user.comparePassword(req.body.password)) {
      throw {
        message: "incorrect password",
      };
    }

    return res.status(201).json({
      acess_token: token,
      data: user,
      message: "Successfully found User",
      success: true,
      err: {},
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      data: {},
      message: "Couldn't find User",
      success: false,
      err: { error },
    });
  }
};
