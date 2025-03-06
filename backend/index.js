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
app.engine("hbs", engine({ extname: ".hbs", defaultLayout: "main" }));
app.set("view engine", "hbs");
app.set("views", path.join(path.dirname(new URL(import.meta.url).pathname.slice(1)), "templates"));





app.use("/api", authRouter)
app.use("/user", userRouter);
app.use("/resume", resumeRouter);

// Store resume data dynamically
let resumeData = {};
let a = 2
let b = 4

// API to receive and store resume data
app.post("/generate-resume", (req, res) => {
    resumeData = req.body;
    res.status(200).json({ message: "Resume data received successfully!" });
});

// Route to render the dynamic resume
app.get("/resume", (req, res) => {
    if (a === 1) {
        return res.render("layouts/resume", resumeData);
    }
    return res.render("layouts/resume1", resumeData);
});






// Route to generate and download PDF
app.get("/download-pdf", async (req, res) => {
    try {
        const browser = await puppeteer.launch({ headless: "new" });
        const page = await browser.newPage();

        // Render the updated HTML with received resume data
        let content = "layouts/resume"
        if (a === 2) {
            content = "layouts/resume1"
        }
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
