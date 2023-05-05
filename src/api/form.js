const nodemailer = require('nodemailer');
require('dotenv').config();

export default function formHandler(req, res){
    
    if (!req.body.email) {
        return res.status(422).json("Email is required")
    }
    
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: process.env.SMTPUSER,
          pass: process.env.SMTPPASS,
        },
    });

    const mailData = {
        from: process.env.smtpUser,
        to: req.body.email ? req.body.email : '',
        subject: "try nodemailer",
        text: "sending mail by nodemailer",
    }

    const result = transporter.sendMail(mailData)
        .then(result => res.status(200).json(JSON.stringify(result)))
        .catch(error => res.status(500).json(JSON.stringify(error)))
}
