import { Sender } from "../config/mailConfig.js";
import { JWT_SECRET } from "../config/serverconfig.js";
import { getUserFromMail } from "../middlewares/functions.js";
import jwt from "jsonwebtoken";
export const sendEmail = async (req, res) => {
  try {
    const mailTo = req.params.email;

    const user = await getUserFromMail(mailTo);

    if (user === null) {
      throw {
        message: "Incorrect email",
      };
    }
    const secret = JWT_SECRET + user.password;

    const payload = {
      email: user.email,
      id: user._id,
    };
    const token = jwt.sign(payload, secret, { expiresIn: "15m" });
    const link = `https://localhost:5173/reset-password/${token}`;
    // await Sender.sendMail({
    //   from: mailFrom,
    //   to: mailTo,
    //   subject: mailSubject,
    //   text: link,
    // });
    return res.status(201).json({
      data: link,
      success: true,
      message: "successfully sent a mail ",
      err: {},
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      data: {},
      success: false,
      message: "couldn't send mail",
      err: error.message,
    });
  }
};

export const getToken = async (req, res) => {
  try {
    const token = req.body.token;
    const newPassword = req.body.password;
    const mail = req.body.email;
    const user = await getUserFromMail(mail);
    if (user === null) {
      throw {
        message: "Incorrect email",
      };
    }
    const secret = JWT_SECRET + user.password;
    const decoded = jwt.verify(token, secret);
    if (!decoded) {
      throw {
        message: "Invalid token",
      };
    }
    user.resetPassword(newPassword);

    const jwtToken = await user.genJwt(user);
    return res.status(201).json({
      data: jwtToken,
      success: true,
      message: "successfully changed password ",
      err: {},
    });
  } catch (error) {
    return res.status(500).json({
      data: {},
      success: false,
      message: "couldn't change password",
      err: { error },
    });
  }
};
