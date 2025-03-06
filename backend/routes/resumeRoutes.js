import express from "express"
import { getAllResume, getResumeById } from "../controller/resumeController.js"
const resumeRouter = express.Router()


resumeRouter.get("/", getAllResume);
resumeRouter.p
resumeRouter.get("/get", getResumeById);


export default resumeRouter