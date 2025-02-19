import dotenv from "dotenv"
dotenv.config();
import cors from "cors";
import express from "express"
import puppeteer from "puppeteer";
import fs from "fs"

const app = express();


app.use(cors({
    origin:"*"
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


 
// Endpoint to fetch the resume template
app.get('/resume-template', async (req, res) => {
    const templatePath = "./templates/template1.html" // Path to your template file
      fs.readFile(templatePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading template:', err);
            return res.status(500).send('Failed to load template');
        }
        res.send(data);
    });
});

app.post("/generate-pdf", async (req, res) => {
    try {
        const { htmlContent } = req.body;

        if (!htmlContent) {
            return res.status(400).send("No HTML content received.");
        }

        const browser = await puppeteer.launch({ headless: "new" });
        const page = await browser.newPage();

        // Set page content
        await page.setContent(htmlContent, { waitUntil: "networkidle0" });

        // Generate PDF
        const pdfBuffer = await page.pdf({ format: "A4", printBackground: true });

        await browser.close();

        console.log("PDF Generated, Size:", pdfBuffer.length);

        // Send the PDF response
        res.set({
            "Content-Type": "application/pdf",
            "Content-Disposition": "attachment; filename=resume.pdf",
            "Content-Length": pdfBuffer.length,
        });

        res.send(pdfBuffer);
    } catch (error) {
        console.error("Error generating PDF:", error);
        res.status(500).send("Failed to generate PDF.");
    }
});




const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
