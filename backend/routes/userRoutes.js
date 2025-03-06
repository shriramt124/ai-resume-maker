import express from "express"
import User from "../models/user.model.js";
import { uploadToCloudinary } from "../config/claudinary.js";
import { deleteUser, getAllUsers, getUserById, updateUser } from "../controller/user.controller.js";
import { isAuthenticated, isAuthorized } from "../middleware/isAuthenticated.js";

const userRouter = express.Router();

userRouter.get("/",isAuthenticated,isAuthorized, getAllUsers);
userRouter.post("/update-user",isAuthenticated,isAuthorized, updateUser);
userRouter.post("/delete-user",isAuthenticated,isAuthorized, deleteUser);
userRouter.get("/profile",isAuthenticated, getUserById);
 
export default userRouter;








