import express from "express"
import { downloadResume, generateResume, getAllResume, getResumeById } from "../controller/resumeController.js"
const resumeRouter = express.Router()
import Resume from "../models/resume.models.js";


resumeRouter.get("/", getAllResume);
resumeRouter.post("/generate-Resume",  generateResume)
resumeRouter.get("/get", getResumeById);
resumeRouter.get("/download-pdf",  downloadResume);

export default resumeRouter