import dotenv from "dotenv"
dotenv.config()
import nodemailer from "nodemailer"



const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
})


export const sendEmail = async ({ to, subject, text }) => {
    const mailOptions = {
        from: process.env.EMAIL,
        to,
        subject,
        text
    }
    console.log(mailOptions)
    await transporter.sendMail(mailOptions)
}