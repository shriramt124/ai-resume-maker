import dotenv from "dotenv";
dotenv.config();
import express from "express";
import puppeteer from "puppeteer";
import { engine } from "express-handlebars";
import path from "path";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./routes/authRoutes.js";
import { dbConnect } from "./config/db.js";
import userRouter from "./routes/userRoutes.js";
import resumeRouter from "./routes/resumeRoutes.js";
import Resume from "./models/resume.models.js";

const app = express();
const PORT = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["Authorization", "Set-Cookie"],
    preflightContinue: false,
    optionsSuccessStatus: 200
}))

app.use(express.urlencoded({ extended: true }))
// Configure Handlebars to allow access to prototype properties
app.engine("hbs", engine({
    extname: ".hbs",
    defaultLayout: "main",
    // Add this option to allow prototype access
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true
    }
}));
app.set("view engine", "hbs");
app.set("views", path.join(path.dirname(new URL(import.meta.url).pathname.slice(1)), "templates"));



app.use("/api", authRouter)
app.use("/user", userRouter);
app.use("/resume", resumeRouter);

// Route to generate and download PDF
app.get("/download-pdf", async (req, res) => {
    try {
        // Get template ID and resume data from query parameters
        const templateId = req.query.templateId || "template1";
        const resumeData = req.query.data ? JSON.parse(decodeURIComponent(req.query.data)) : {};

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

        const htmlContent = await new Promise((resolve, reject) => {
            app.render(content, resumeData, (err, html) => {
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
});

app.listen(PORT, async () => {
    await dbConnect();
    console.log(`Server running on http://localhost:${PORT}`);
});
