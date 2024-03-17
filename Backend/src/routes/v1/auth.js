import express from "express";
import {
  createUser,
  LoginUser
} from "../../controller/auth-controller.js";
import { authenticate } from "../../middleware/authenticate.js";
const router = express.Router();

router.post("/auth/signup",createUser);
console.log("router1");  
router.post("/auth/login", LoginUser)

export default router;
