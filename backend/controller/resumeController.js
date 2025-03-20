import Resume from "../models/resume.models.js";
import User from "../models/user.model.js";
import puppeteer from "puppeteer";
import { createResumeSession, getResumeSession, updateResumeSession } from "../utils/resumeSession.js";

export const getAllResume = async (req, res) => {
    try {
        // Get the user ID from the authenticated request
        const userId = req.user._id;

        // Find resumes where the user ID matches
        const resumes = await Resume.find({ _id: req.user.resume });
        res.status(200).json(resumes);
    } catch (error) {
        res.status(500).json({ status: false, message: error.message || "Internal Server Error" });
    }
}

export const showResumeByTemplateId = async (req, res) => {
    try {
        const templateId = req.query.templateId;
        let resumeObject = { templateId: templateId };

        // Check if session ID was provided
        if (req.query.sessionId) {
            // Get resume data from session
            const sessionData = getResumeSession(req.query.sessionId);
            if (sessionData) {
                resumeObject = sessionData;
                console.log("Using form data from session");
            } else {
                console.log("Session not found or expired");
            }
        }
        // Check if form data was sent in the query params (for GET requests via iframe)
        else if (req.query.data) {
            try {
                resumeObject = JSON.parse(decodeURIComponent(req.query.data));
                console.log("Using form data from query parameters");
            } catch (err) {
                console.error("Error parsing form data from query:", err);
            }
        }
        // If no data in query params, check request body (for POST requests)
        else if (req.body && Object.keys(req.body).length > 0) {
            resumeObject = req.body;
            console.log("Using form data from request body");
        } else {
            // If no form data in request body or query, try to fetch from database
            const resumeData = await Resume.findOne({ templateId: templateId });

            // If resume data exists, use it
            if (resumeData) {
                resumeObject = resumeData.toObject();
                console.log(resumeObject, "from the get route");
            }
            // If no data in database, we'll just use the empty object with templateId
        }

        if (templateId === "template1") {
            return res.render("layouts/template1", resumeObject);
        }
        else if (templateId === "template2") {
            return res.render("layouts/template2", resumeObject);
        }
        else if (templateId === "template3") {
            return res.render("layouts/template3", resumeObject);
        }
        else if (templateId === "template4") {
            return res.render("layouts/template4", resumeObject);
        }
        else if (templateId === "template5") {
            return res.render("layouts/template5", resumeObject);
        }
        else if (templateId === "template6") {
            return res.render("layouts/template6", resumeObject);
        }
        else {
            // Default to template1 if no valid template is specified
            return res.render("layouts/template1", resumeObject);
        }
    } catch (error) {
        res.status(500).json({ status: false, message: error.message || "internal server error" });
    }
}

export const createPreviewSession = async (req, res) => {
    try {
        const resumeData = req.body;

        // Create a session for the resume data
        const sessionId = createResumeSession(resumeData);

        // Return the session ID
        return res.status(200).json({
            status: true,
            message: "Preview session created successfully",
            sessionId: sessionId
        });
    } catch (error) {
        console.error("Error creating preview session:", error);
        return res.status(500).json({
            status: false,
            message: error.message || "Internal server error"
        });
    }
}

export const updatePreviewSession = async (req, res) => {
    try {
        const { sessionId } = req.params;
        const resumeData = req.body;

        // Update the session with new resume data
        const updated = updateResumeSession(sessionId, resumeData);

        if (!updated) {
            return res.status(404).json({
                status: false,
                message: "Session not found or expired"
            });
        }

        return res.status(200).json({
            status: true,
            message: "Preview session updated successfully"
        });
    } catch (error) {
        console.error("Error updating preview session:", error);
        return res.status(500).json({
            status: false,
            message: error.message || "Internal server error"
        });
    }
}



export const downloadResume = async (req, res) => {
    try {
        // Get template ID and resume data
        const templateId = req.query.templateId || "template1";
        let resumeData = {};

        // Check if session ID was provided
        if (req.query.sessionId) {
            // Get resume data from session
            const sessionData = getResumeSession(req.query.sessionId);
            if (sessionData) {
                resumeData = sessionData;
            }
        }
        // Check if data was provided in query params
        else if (req.query.data) {
            resumeData = JSON.parse(decodeURIComponent(req.query.data));
        }
        // If no data provided in query params, try to fetch from database
        else if (req.query.resumeId) {
            try {
                const resume = await Resume.findById(req.query.resumeId);
                if (resume) {
                    resumeData = resume.toObject();
                }
            } catch (err) {
                console.error("Error fetching resume data:", err);
            }
        }

        const browser = await puppeteer.launch({
            headless: "new",
            executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || "C:\\Users\\Lenovo\\.cache\\puppeteer\\chrome\\win64-134.0.6998.35\\chrome-win64\\chrome.exe"
        });
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

export const saveResume = async (req, res) => {
    try {
        const resumeData = req.body;
        const templateId = resumeData.templateId;

        // Get the authenticated user from the request
        console.log(req.user, "from the save resume")
        const user = req.user;

        if (!user) {
            return res.status(401).json({ status: false, message: "User not authenticated" });
        }

        if (!templateId) {
            return res.status(400).json({ status: false, message: "Template ID is required" });
        }

        // Check if resume with this templateId already exists
        const existingResume = await Resume.findOne({ templateId: templateId });

        let result;
        if (existingResume) {
            // Update existing resume
            result = await Resume.findOneAndUpdate(
                { templateId: templateId },
                resumeData,
                { new: true }
            );

            // Update the user's resume reference
            await User.findByIdAndUpdate(user._id, { resume: result._id });

            return res.status(200).json({
                status: true,
                message: "Resume saved successfully",
                data: result
            });
        } else {
            // Create new resume
            result = await Resume.create(resumeData);

            // Update the user's resume reference
            await User.findByIdAndUpdate(user._id, { resume: result._id });

            return res.status(201).json({
                status: true,
                message: "Resume created successfully",
                data: result
            });
        }
    } catch (error) {
        console.error("Error saving resume:", error);
        return res.status(500).json({
            status: false,
            message: error.message || "Internal server error"
        });
    }
}