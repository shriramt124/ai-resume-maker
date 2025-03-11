import express from "express"
import { downloadResume, getAllResume, showResumeByTemplateId, saveResume, createPreviewSession, updatePreviewSession } from "../controller/resumeController.js"
const resumeRouter = express.Router()
import Resume from "../models/resume.models.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
 

resumeRouter.get("/",isAuthenticated, getAllResume);
resumeRouter.get("/showByTemplateId", isAuthenticated, showResumeByTemplateId);
resumeRouter.get("/download-pdf", isAuthenticated,  downloadResume);
resumeRouter.post("/save", isAuthenticated, saveResume);

// New routes for session-based preview
resumeRouter.post("/create-preview-session", isAuthenticated, createPreviewSession);
resumeRouter.put("/update-preview-session/:sessionId", isAuthenticated, updatePreviewSession);

export default resumeRouter