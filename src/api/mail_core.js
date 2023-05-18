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
                console.log(error)
            })
        return response
    }

    /**
     * メールを送る
     * 値が違ければエラーを返す
     */
    // send = async () =>{
    
    //     let response = {
    //         "status": "init",
    //         "admin_sendedMail": false,
    //         "user_sendedMail": false
    //     }

    //     // 運営に送信
    //     await transporter.sendMail(adminData)
    //         .then(result =>{
    //             response.admin_sendedMail = true
    //             response.status = "success"
    //         })
    //         .catch(error => {
    //             response.status = "error"
    //             console.log(error)
    //         })
    //     if(response.status == "error"){
    //         return response
    //     }

    //     // userに送信
    //     await transporter.sendMail(userData)
    //         .then(result =>{
    //             response.user_sendedMail = true
    //             response.status = "success"
    //         })
    //         .catch(error => {
    //             response.status = "error"
    //             console.log(error)
    //         })

    //     if(response.status == "error"){
    //         const erroEmail = {
    //             from: process.env.SMTPUSER,
    //             to: process.env.ADMINMAIL,
    //             subject: `【送信エラー】お客様のメールアドレスに送信出来ませんでした`,
    //             text: this.mail_plain,
    //             html: mail_common.render_html("【送信エラー】" + this.mail_subject ,this.html)
    //         }
    //         await transporter.sendMail(erroEmail)
    //     }
    //     return response
    // }
}