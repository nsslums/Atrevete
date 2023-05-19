const nodemailer = require('nodemailer');
require('dotenv').config();

/**
 * 新規メール
 */

class Response{
    constructor(){
        this.res = {
            "status": "init",
        }
    }
}

export class MailCore{
    constructor(){
        this.transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
              user: process.env.SMTPUSER,
              pass: process.env.SMTPPASS,
            },
        });
    }

    send_single = async (data) =>{

        let response = new Response().res
        await this.transporter.sendMail(data)
            .then(result =>{
                response.status = "success"
            })
            .catch(error => {
                response.status = "error"
            })
        return response
    }

    send = async (udata, adata) =>{
        let response = new Response().res

        // 運営に送信
        await this.transporter.sendMail(adata)
            .then(result =>{
                response.admin_sendedMail = true
                response.status = "success"
            })
            .catch(error => {
                response.admin_sendedMail = false
                response.status = "error"
            })
        if(response.status == "error"){
            return response
        }

        // userに送信
        await this.transporter.sendMail(udata)
            .then(result =>{
                response.user_sendedMail = true
                response.status = "success"
            })
            .catch(error => {
                response.user_sendedMail = false
                response.status = "error"
            })

        if(response.status == "error"){
            const erroEmail = {
                from: process.env.SMTPUSER,
                to: process.env.ADMIN_MAIL,
                subject: `【送信エラー】お客様のメールアドレスに送信出来ませんでした`,
                text: adata.text
            }
            await this.transporter.sendMail(erroEmail)
        }
        return response
    }
}