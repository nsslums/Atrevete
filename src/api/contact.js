import request from "request"
import { MailCore } from "./mail_core"

export default async function sendMail(req, res){

    if(!req.body.token){
        return res.status(422).json({status: "error", error: {code: 442, message: 'need reCAPTCHA'}})
    }

    const verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRETKEY}&response=${req.body.token}`
    
    request(verificationUrl, (err, response, body) => {
        if (err) {
            return res.status(401).json({
                status: "error",
                error: {code: 401, message: 'reCAPTCHA request error.'}
            })
        }
        const { success, score } = JSON.parse(body)
        if (!success || score <= 0.5) {
            return res.status(400).json({
                status: "error",
                error: {code: 400, message: 'reCAPTCHA judge failed. Are you robot..?'}
            })
        }
    })

    if(!req.body.name){
        return res.status(422).json({status: "error", error: {code: 442, message: 'need name'}})
    }
    if(!req.body.email){
        return res.status(422).json({status: "error", error: {code: 442, message: 'need email'}})
    }
    if(!req.body.subject){
        return res.status(422).json({status: "error", error: {code: 442, message: 'need subject'}})
    }
    if(!req.body.content){
        return res.status(422).json({status: "error", error: {code: 442, message: 'need content'}})
    }

    const plain = `※このメールはシステムからの自動送信です

お問い合わせ頂きありがとうございます。
以下の内容でお問い合わせを受け付けいたしました。

xxxxxxx営業日以内にご連絡させていただきます。

━━━━━━━━━━━━ お問い合わせ内容 ━━━━━━━━━━━━
お名前: ${req.body.name}
メールアドレス: ${req.body.email}
件名: ${req.body.subject}
電話番号: ${req.body.phone}
お問い合わせ内容: ${req.body.content}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

——————————————————————————————
Atrevete
web: atrvt2022.com
メール: contact@atrvt2022.com
——————————————————————————————
`

    const admData = {
        from: process.env.ADMIN_MAIL,
        to: process.env.ADMIN_MAIL,
        replyTo: req.body.email,
        subject: `【新規】お問い合わせ受け付けのお知らせ`,
        text: plain,
    }

    const userData = {
        from: process.env.ADMIN_MAIL,
        to: req.body.email,
        replyTo: process.env.ADMIN_MAIL,
        subject: `【Atrevete】お問い合わせ受け付けのお知らせ`,
        text: plain,
    }

    const mail = new MailCore()
    // const response = await mail.send_single(testData)
    const response = await mail.send(userData, admData)

    return res.status(200).json(response)
    
}