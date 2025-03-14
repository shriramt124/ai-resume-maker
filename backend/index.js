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
 

app.listen(PORT, async () => {
    await dbConnect();
    console.log(`Server running on http://localhost:${PORT}`);
});
