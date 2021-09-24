//require("dotenv").config()
const nodemailer = require('nodemailer')
//mail set
exports.transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_ID,
        pass: process.env.EMAIL_PASSWORD
    }
})

exports.sendMail = (user, subject, text)=>{
    this.transport.sendMail({
        from: process.env.EMAIL_ID,
        to: user.email,
        subject,
        text
    })
}