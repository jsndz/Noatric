import { Sender } from "../config/mailConfig.js";
import { JWT_SECRET } from "../config/serverconfig.js";
import { getUserFromMail } from "../middlewares/functions.js";
import jwt from "jsonwebtoken";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
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
    const link = `http://localhost:5173/reset-password/${token}`;
    await Sender.sendMail({
      from: "Noatric Team <no-reply@noatric.com>",
      to: mailTo,
      subject: "Reset Password",
      html: `
    <!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Password Reset Email</title>
</head>
<body style="margin: 0; padding: 0; background-color: black; color: white; font-family: Arial, sans-serif;">

<div style="max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 10px; overflow: hidden; background-color: black;">
  <div style="background-color: black; padding: 20px; text-align: center;">
    <img src="cid:logoImage" alt="Company Logo" style="max-width: 150px; height: auto; margin-bottom: 20px;">
    <h1 style="font-size: 24px; color: #333;">Password Reset</h1>
  </div>
  <div style="padding: 20px;">
    <h2 style="font-size: 20px; color: #333;">Reset Your Password</h2>
    <p style="font-size: 16px; color: #666;">You recently requested to reset your password for your account. Click the button below to reset it.</p>
    <a href="${link}" style="display: inline-block; padding: 10px 20px; font-size: 16px; color: #fff; background-color: #007BFF; border-radius: 5px; text-decoration: none; text-align: center;">Reset Password</a>
  </div>
  <div style="background-color: black; padding: 20px; text-align: center; font-size: 14px; color: #666;">
    If you did not request a password reset, please ignore this email or contact support.
  </div>
</div>

</body>
</html>

  `,
      attachments: [
        {
          filename: "noatric-removebg.png",
          path: path.join(__dirname, "../../noatric-removebg.png"),
          cid: "logoImage",
        },
      ],
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
