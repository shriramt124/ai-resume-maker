import Resume from "../models/resume.models.js";
import puppeteer from "puppeteer";

export const getAllResume = async (req, res) => {
    try {
        const resume = await Resume.find();
        res.status(200).json(resume);
    } catch (error) {
        res.status(500).json({ status: false, message: error.message || "Internal Server Error" });
    }
}

export const getResumeById = async (req, res) => {
    try {
        const templateId = req.query.templateId;
        console.log(templateId)
        const resumeData = await Resume.findOne({ templateId: templateId });

        if (!resumeData) {
            return res.status(404).json({ status: false, message: "Resume not found" });
        }

        // Convert Mongoose document to plain JavaScript object
        const resumeObject = resumeData.toObject();
        console.log(resumeObject, "from the get route")

        if (templateId === "template1") {
            return res.render("layouts/template1", resumeObject);
        }
        else if (templateId === "template2") {
            return res.render("layouts/template2", resumeObject);
        }
        else {
            return res.render("layouts/template3", resumeObject);
        }
        //we will take the templateId from the backend 
    } catch (error) {
        res.status(500).json({ status: false, message: error.message || "internal server error" });
    }
}

export const generateResume = async (req, res) => {
    try {
        const resumeData = req.body;
        const templateId = resumeData.templateId;
        console.log(templateId, "from the resumeRoutes")
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
}

export const downloadResume = async (req, res) => {
    try {
        // Get template ID and resume data from query parameters
        const templateId = req.query.templateId || "template1";
        let resumeData = req.query.data ? JSON.parse(decodeURIComponent(req.query.data)) : {};

        // If no data provided in query params, try to fetch from database
        if (!Object.keys(resumeData).length && req.query.resumeId) {
            try {
                const resume = await Resume.findById(req.query.resumeId);
                if (resume) {
                    resumeData = resume.toObject();
                }
            } catch (err) {
                console.error("Error fetching resume data:", err);
            }
        }

        const browser = await puppeteer.launch({ headless: "new" });
        const page = await browser.newPage();

        // Select template based on templateId
        let content = `layouts/${templateId}`;

        // Use req.app to access the Express app instance
        const htmlContent = await new Promise((resolve, reject) => {
            req.app.render(content, resumeData, (err, html) => {
                if (err) reject(err);
                else resolve(html);
            });
        });

        await page.setContent(htmlContent, { waitUntil: "load" });

        // Generate PDF
        const pdfBuffer = await page.pdf({
            format: "A4",
            printBackground: true,
            margin: { top: "20px", bottom: "20px", left: "20px", right: "20px" }
        });

        await browser.close();

        // Send PDF as response
        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", 'attachment; filename="resume.pdf"');
        res.end(pdfBuffer);

    } catch (error) {
        console.error("Error generating PDF:", error);
        res.status(500).send("Error generating PDF");
    }
}