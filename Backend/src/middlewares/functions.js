import User from "../models/User.js";
export async function getIdFromMail(email) {
  try {
    const user = await User.findOne({ email: email });
    return user._id;
  } catch (error) {
    console.log(error);
  }
}

export async function getUserFromMail(email) {
  try {
    const user = await User.findOne({ email: email });

    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
