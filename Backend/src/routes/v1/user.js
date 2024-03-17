import express from "express";
import {
  fetchLoggedInUserById,
  createUser,
  updateUser,
} from "../../controller/user-controller.js";
const router = express.Router();

router.get("/users/:id", fetchLoggedInUserById);

router.patch("/users/:id", updateUser);
export default router;
