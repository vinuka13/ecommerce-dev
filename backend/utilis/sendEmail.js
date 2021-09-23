const nodemailer = require('nodemailer')

const sendEmail = async function(options){
    const transporter = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
        user: "2347f510469fc7",
        pass: "7e5c9ac829c3a4"
  }
    })

    const message = {
        from: `noreply@ecom.com, <ecom>`,
        to: options.email,
        subject: options.subject,
        text: options.message
    }

    await transporter.sendMail(message)
}

module.exports = sendEmail
