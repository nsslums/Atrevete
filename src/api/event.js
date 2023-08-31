import { error } from "console";
import { MailCore } from "./mail_core";
import request from "request";

export const config = {
  bodyParser: {
    json: {
      type: "application/json",
      limit: "10mb"
    },
    raw: {
      type: "application/octet-stream",
      limit: "10mb"
    },
    text: {
      type: "text/plain",
      limit: "10mb"
    },
    urlencoded: {
      type: "application/x-www-form-urlencoded",
      limit: "10mb",
      extended: true
    }
  }
}


export default async function sendMail(req, res){

    if(!req.body.token){
        const error = {status: "error", error: {code: 442, message: 'need reCAPTCHA'}};
        console.log(error);
        return res.status(422).json(error)
    }

    const verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRETKEY}&response=${req.body.token}`
    
    request(verificationUrl, (err, response, body) => {
        if (err) {
            const error = {code: 401, message: 'reCAPTCHA request error.'};
            console.log(error);
            return res.status(401).json({
                status: "error",
                error: error
            })
        }
        const { success, score } = JSON.parse(body)
        if (!success || score <= 0.5) {
            const error = {code: 400, message: 'reCAPTCHA judge failed. Are you robot..?'};
            console.log(error);
            return res.status(400).json({
                status: "error",
                error: error
            })
        }
    })

    if(!req.body.event){
      const error = {status: "error", error: {code: 442, message: 'need event'}}
      console.log(error);
      return res.status(422).json(error)
    }
    if(!req.body.name){
      const error = {status: "error", error: {code: 442, message: 'need name'}}
      console.log(error);
      return res.status(422).json(error)
    }
    if(!req.body.name_kana){
      const error = {status: "error", error: {code: 442, message: 'need name_kana'}}
      console.log(error);
      return res.status(422).json(error)
    }
    if(!req.body.birthday){
      const error = {status: "error", error: {code: 442, message: 'need birthday'}}
      console.log(error);
      return res.status(422).json(error)
    }
    if(!req.body.email){
      const error = {status: "error", error: {code: 442, message: 'need email'}}
      console.log(error);
      return res.status(422).json(error)
    }
    if(!req.body.pr){
      const error = {status: "error", error: {code: 442, message: 'need pr'}}
      console.log(error);
      return res.status(422).json(error)
    }
    // if(!req.files){
    //   return res.status(422).json({status: "error", error: {code: 442, message: 'need file'}})
    // }

    // const fname = req.files[0].originalname
    // const buffer = req.files[0].buffer  // file

    const certifications_enc = JSON.parse(req.body.certifications)
    let certifications = ''
    certifications_enc.map(certification =>{
      certifications += certification.text + "\n"
    });
const plain = `※このメールはシステムからの自動送信です

イベントにご応募頂きありがとうございます。
以下の内容で受け付けいたしました。

選考結果、および詳細は改めてご連絡させていただきます。

━━━━━━━━━━━━━━━ ご入力内容 ━━━━━━━━━━━━━━
イベント名: ${req.body.event}
お名前: ${req.body.name}
カタカナ: ${req.body.name_kana}
生年月日: ${req.body.birthday}
メールアドレス: ${req.body.email}
大学名: ${req.body.university}
経歴・学外活動: ${req.body.career}
資格: ${certifications}
自己PR: ${req.body.pr}
Instagram ID: ${req.body.instagram}
TikTok ID: ${req.body.tiktok}
Twitter ID: ${req.body.twitter}
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
      subject: `【新規】イベントお申し込みのお知らせ`,
      text: plain,
      // attachments:[{
      //   filename: fname,
      //   content: buffer,
      // }]
    }

    const userData = {
      from: process.env.ADMIN_MAIL,
      to: req.body.email,
      replyTo: process.env.ADMIN_MAIL,
      subject: `【Atrevete】イベントお申し込みのお知らせ`,
      text: plain,
      // attachments:[{
      //   filename: fname,
      //   content: buffer,
      // }]
    }

    const mail = new MailCore()
    // const response = await mail.send_single(testData)
    const response = await mail.send(userData, admData)

    return res.status(200).json(response)
    
}
