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
        const templateId = req.query.templateId;
        console.log(templateId)
        const resumeData = await Resume.findOne({ templateId: templateId });
        
        if(!resumeData) {
            return res.status(404).json({ status: false, message: "Resume not found" });
        }
        
        // Convert Mongoose document to plain JavaScript object
        const resumeObject = resumeData.toObject();
        console.log(resumeObject ,"from the get route")
        
        if(templateId === "template1"){
            return res.render("layouts/template1", resumeObject);
        }
        else if(templateId === "template2"){
            return res.render("layouts/template2", resumeObject);
        }
        else {
            return res.render("layouts/template3", resumeObject);
        }
        //we will take the templateId from the backend 
    } catch (error) {
        res.status(500).json({ status:false, message: error.message || "internal server error" });
    }
}