import express from "express"
import { getAllResume, getResumeById } from "../controller/resumeController.js"
const resumeRouter = express.Router()
import Resume from "../models/resume.models.js";


resumeRouter.get("/", getAllResume);
resumeRouter.post("/generate-Resume", async (req, res) => {
    try {
        const resumeData = req.body;
        const templateId = resumeData.templateId;
        console.log(templateId,"from the resumeRoutes")
        //if templateId exisit then we have to update the data other wise we have to create the new data 
        const existResumeData = await Resume.findOne({ templateId: templateId });
        if (existResumeData) {
            console.log("Resume existes")
            //update the data
            const updatedResumeData = await Resume.findOneAndUpdate({ templateId: templateId }, resumeData, { new: true });
            return res.status(200).json({ status: true, message: "Resume data updated successfully", data: updatedResumeData });
        } else {
            //create the new data
            const newResumeData = await Resume.create(resumeData);
            return res.status(201).json({ status: true, message: "Resume data created successfully", data: newResumeData });
        }

    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: false, message: error.message || "internal server error" })
    }
})
resumeRouter.get("/get", getResumeById);


export default resumeRouter