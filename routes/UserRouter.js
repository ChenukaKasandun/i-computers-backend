import express from "express";
import {
  createUser,
  deleteUser,
  getUser,
  loginUser,
  updateUser,
} from "../controller/UserController.js";

const userRouter = express.Router();

// For POST Requests
userRouter.post("/", createUser);
userRouter.post("/login", loginUser);

// For GET Requests
userRouter.get("/", getUser);

// For PUT Requests
userRouter.put("/", updateUser);

// For Delete Requests
userRouter.delete("/", deleteUser);

// Export the router
export default userRouter;
