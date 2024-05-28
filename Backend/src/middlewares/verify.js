import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/serverconfig.js";

const authenticateToken = (req, res, next) => {
  const authToken = req.headers.authorization;
  if (!authToken) {
    return res
      .status(401)
      .json({ message: "Authentication token is required" });
  }
  const token = authToken.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.log("error", error.name);
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    }
    return res.status(403).json({ message: "Invalid token" });
  }
};

export { authenticateToken };
