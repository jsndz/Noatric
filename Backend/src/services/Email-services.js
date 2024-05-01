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
    const secret = JWT_SECRET;

    const payload = {
      email: user.email,
      id: user._id,
    };
    const token = await jwt.sign(payload, secret, { expiresIn: "15m" });
    const link = `https://localhost:5173/reset-password/${token}`;
    await Sender.sendMail({
      from: "Noatric Team <",
      to: mailTo,
      subject: "Reset Password",
      text: `<div class="container">
        <div class="header">
            <div class="logo">Company Logo</div>
            <h1>Password Reset</h1>
        </div>
        <div class="invoice">
            <div class="invoice-header">
                <h2 class="invoice-title">Reset Your Password</h2>
                <p class="invoice-details">You recently requested to reset your password for your account. Click the button below to reset it.</p>
            </div>
            <a href="${link}" class="reset-button">Reset Password</a>
        </div>
        <div class="footer">
            If you did not request a password reset, please ignore this email or contact support.
        </div>
    </div>`,
    });
    return res.status(201).json({
      data: {},
      success: true,
      message: "successfully sent a mail ",
      err: {},
    });
  } catch (error) {
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
    const secret = JWT_SECRET;
    const decoded = await jwt.verify(token, secret);
    if (!decoded) {
      throw {
        message: "Invalid token",
      };
    }
    await user.resetPassword(newPassword);

    const jwtToken = await user.genJwt(user);
    return res.status(201).json({
      data: jwtToken,
      success: true,
      message: "successfully changed password ",
      err: {},
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      data: {},
      success: false,
      message: "couldn't change password",
      err: { error },
    });
  }
};
