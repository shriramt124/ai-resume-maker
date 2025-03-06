import Resume from "../models/resume.models.js";


export const getAllResume = async (req, res) => {
    try {
        const resume = await Resume.find();
        res.status(200).json(resume);
    } catch (error) {
        res.status(500).json({status:false, message: error.message || "Internal Server Error" });
    }
}

export const getResumeById = async (req, res) => {
    try {
        const resumeId = req.body;
        const resumeData = await Resume.findById(resumeId);
        const templateId = resumeData.templateId;
        if(templateId === "template1"){
         res.render("layouts/template1",resumeData)
        }
        else if(templateId === "template2"){
            res.render("layouts/template2",resumeData)
        }
        return res.render("layouts/template3",resumeData)
        //we will take the templateId from the backend 
    } catch (error) {
        res.status(500).json({ status:false,message: error.message || "internal server error" });
    }
}