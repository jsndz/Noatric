import User from "../models/User.js";

export const fetchLoggedInUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id,'name email id');
    return res.status(201).json({
      data: user,
      message: "Successfully returned user",
      success: true,
      err: {},
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      data: {},
      message: "Couldn't get user",
      success: false,
      err: { error },
    });
  }
};

export const createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    await User.save();
    return res.status(201).json({
      data: User,
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


export const updateUser = async (req, res) => {
    const {id} = req.params;
    try {
      const User = await User.findByIdAndUpdate(id,req.body,{new:true});
      
      return res.status(201).json({
        data: User,
        message: "Successfully got User by id",
        success: true,
        err: {},
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        data: {},
        message: "Couldn't get User",
        success: false,
        err: { error },
      });
    }
  };