import express from "express";
import { forgotPassword, isLoggedIn, login, logoutUser, refreshToken, register, resetPassword } from "../controller/authController.js";
const authRouter = express.Router();
 

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/logout", logoutUser);
authRouter.post("/forgot-password", forgotPassword)
authRouter.post("/reset-password/:token", resetPassword)
authRouter.get("/isLoggedIn", isLoggedIn);
authRouter.get("/refreshToken", refreshToken);



export default authRouter;

