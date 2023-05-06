const nodemailer = require('nodemailer');
require('dotenv').config();

/**
 * 新規メール
 */
export class Mail{
    /**
     * 
     * @param {string} to 送信先アドレス
     * @param {string} subject 件名
     * @param {string} body formatした本文
     */
    constructor(to, subject, body){
        this.mail_to = to
        this.mail_subject = subject
        this.mail_body = body
    }

    /**
     * メールを送る
     * 値が違ければエラーを返す
     */
    send = () =>{
        if (!this.mail_to) {
            throw new Error('422');
        }
        if (!this.mail_subject) {
            throw new Error('422');
        }
        if (!this.mail_body) {
            throw new Error('422');
        }
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
              user: process.env.SMTPUSER,
              pass: process.env.SMTPPASS,
            },
        });
    
        const userData = {
            from: process.env.SMTPUSER,
            to: this.mail_to,
            subject: this.mail_subject + " 確認メール",
            text: this.mail_body,
        }
    
        const adminData = {
            from: process.env.SMTPUSER,
            to: process.env.ADMINMAIL,
            replyTo : process.env.REPLYTO,
            subject: this.mail_subject,
            text: this.mail_body,
        }
    
        // transporter.sendMail(adminData)
        // .then(result => res.status(200).json(JSON.stringify(result)))
        //     .catch(error => res.status(500).json(JSON.stringify(error)))
    
        // transporter.sendMail(userData)
        // .then(result => res.status(200).json(JSON.stringify(result)))
        //     .catch(error => res.status(500).json(JSON.stringify(error)))
    }
}
const formHandler = (req, res) =>{
    
    if (!req.body.email) {
        return res.status(422).json("Email is required")
    }
    if (!req.body.subject) {
        return res.status(422).json("subject is required")
    }
    
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: process.env.SMTPUSER,
          pass: process.env.SMTPPASS,
        },
    });

    const userData = {
        from: process.env.SMTPUSER,
        to: req.body.email ? req.body.email : '',
        subject: "try nodemailer",
        text: "sending mail by nodemailer",
    }

    const adminData = {
        from: process.env.SMTPUSER,
        to: process.env.ADMINMAIL,
        replyTo : process.env.REPLYTO,
        subject: "try nodemailer",
        text: "sending mail by nodemailer",
    }

    transporter.sendMail(adminData)
    .then(result => res.status(200).json(JSON.stringify(result)))
        .catch(error => res.status(500).json(JSON.stringify(error)))

    transporter.sendMail(userData)
    .then(result => res.status(200).json(JSON.stringify(result)))
        .catch(error => res.status(500).json(JSON.stringify(error)))
}
