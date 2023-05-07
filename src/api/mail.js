const nodemailer = require('nodemailer');
require('dotenv').config();
import { Common } from './mailTemplate';

/**
 * 新規メール
 */
export class Mail{
    /**
     * 
     * @param {string} to 送信先アドレス
     * @param {string} mailType お問い合わせ, イベント応募
     * @param {string} subject 件名
     * @param {string} plain formatした本文
     * @param {string} html formatしたhtml
     */
    constructor(to, mailType, subject, plain, html = ""){
        this.mail_to = to
        this.mailType = mailType
        this.mail_subject = subject
        this.mail_plain = plain
        this.html = html
    }

    /**
     * メールを送る
     * 値が違ければエラーを返す
     */
    send = async () =>{
        if (!this.mail_to) {
            throw new Error('422');
        }
        if (!this.mail_subject) {
            throw new Error('422');
        }
        if (!this.mail_plain) {
            throw new Error('422');
        }

        const mail_common = new Common()
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
            subject: `【${this.mailType}】確認メール`,
            text: this.mail_plain + mail_common.Note_plain(),
            html: mail_common.render_html("内容確認メール", this.html + mail_common.Note_html()) 
        }
    
        const adminData = {
            from: process.env.SMTPUSER,
            to: process.env.ADMINMAIL,
            replyTo : this.mail_to,
            subject: `【新規${this.mailType}】${this.mail_subject}`,
            text: this.mail_plain,
            html: mail_common.render_html("【新規】" + this.mail_subject ,this.html)
        }
    
        let response = {
            "status": "init",
            "admin_sendedMail": false,
            "user_sendedMail": false
        }

        // 運営に送信
        await transporter.sendMail(adminData)
            .then(result =>{
                response.admin_sendedMail = true
                response.status = "success"
            })
            .catch(error => {
                response.status = "error"
                console.log(error)
            })
        if(response.status == "error"){
            return response
        }

        // userに送信
        await transporter.sendMail(userData)
            .then(result =>{
                response.user_sendedMail = true
                response.status = "success"
            })
            .catch(error => {
                response.status = "error"
                console.log(error)
            })

        if(response.status == "error"){
            const erroEmail = {
                from: process.env.SMTPUSER,
                to: process.env.ADMINMAIL,
                subject: `【送信エラー】お客様のメールアドレスに送信出来ませんでした`,
                text: this.mail_plain,
                html: mail_common.render_html("【送信エラー】" + this.mail_subject ,this.html)
            }
            await transporter.sendMail(erroEmail)
        }
        return response
    }
}

// const formHandler = (req, res) =>{
    
//     if (!req.body.email) {
//         return res.status(422).json("Email is required")
//     }
//     if (!req.body.subject) {
//         return res.status(422).json("subject is required")
//     }
    
//     const transporter = nodemailer.createTransport({
//         service: 'Gmail',
//         auth: {
//           user: process.env.SMTPUSER,
//           pass: process.env.SMTPPASS,
//         },
//     });

//     const userData = {
//         from: process.env.SMTPUSER,
//         to: req.body.email ? req.body.email : '',
//         subject: "try nodemailer",
//         text: "sending mail by nodemailer",
//     }

//     const adminData = {
//         from: process.env.SMTPUSER,
//         to: process.env.ADMINMAIL,
//         replyTo : process.env.REPLYTO,
//         subject: "try nodemailer",
//         text: "sending mail by nodemailer",
//     }

//     transporter.sendMail(adminData)
//     .then(result => res.status(200).json(JSON.stringify(result)))
//         .catch(error => res.status(500).json(JSON.stringify(error)))

//     transporter.sendMail(userData)
//     .then(result => res.status(200).json(JSON.stringify(result)))
//         .catch(error => res.status(500).json(JSON.stringify(error)))
// }
