import nodemailer from 'nodemailer';
var dotenv = require("dotenv")
dotenv.config()

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    debug: process.env.NODE_ENV === 'development',
    auth: {
        user: process.env.GMAIL_EMAIL,
        pass: process.env.PASS
    },
    tls: {
        rejectUnauthorized: false
    }
});

export default transporter;