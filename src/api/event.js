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

    if(!req.body.event){
      return res.status(422).json("{status: error, error: {code: 442, message: 'need event'}}")
    }
    if(!req.body.name){
      return res.status(422).json({status: "error", error: {code: 442, message: 'need name'}})
    }
    if(!req.body.birthday){
      return res.status(422).json({status: "error", error: {code: 442, message: 'need birthday'}})
    }
    if(!req.body.university){
      return res.status(422).json({status: "error", error: {code: 442, message: 'need university'}})
    }
    if(!req.body.email){
      return res.status(422).json({status: "error", error: {code: 442, message: 'need email'}})
    }
    if(!req.body.pr){
      return res.status(422).json({status: "error", error: {code: 442, message: 'need pr'}})
    }
    if(!req.files){
      return res.status(422).json({status: "error", error: {code: 442, message: 'need file'}})
    }

    console.log(req.body.event)
    const fname = req.files[0].originalname
    const buffer = req.files[0].buffer  // file

    const certifications_enc = JSON.parse(req.body.certifications)
    let certifications = ''
    certifications_enc.map(certification =>{
      certifications += certification.text + "\n"
    });
const plain = `※このメールはシステムからの自動送信です

イベントにご応募頂きありがとうございます。
以下の内容で受け付けいたしました。

詳細はメールにてご連絡させていただきます。

━━━━━━━━━━━━━━━ ご入力内容 ━━━━━━━━━━━━━━
イベント名: ${req.body.event}
お名前: ${req.body.name}
誕生日: ${req.body.birthday}
大学: ${req.body.university}
メールアドレス: ${req.body.email}
資格: ${certifications}
自己PR: ${req.body.pr}
経歴・学外活動: ${req.body.career}
Instagram ID: ${req.body.instagram}
TikTok ID: ${req.body.tiktok}
Twitter ID: ${req.body.twitter}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

———————————————
Atrevete
web: xxxxxxxxxxxx.xxxxxxxxx
電話番号: 00-0000-0000
メール: xxxxxx@xxxxxxxxxxxxxxxxxx.xxxxxx
———————————————
`
    const admData = {
      from: process.env.ADMIN_MAIL,
      to: process.env.ADMIN_MAIL,
      replyTo: req.body.email,
      subject: `【新規】イベントお申し込み`,
      text: plain,
      attachments:[{
        filename: fname,
        content: buffer,
      }]
    }

    const userData = {
      from: process.env.ADMIN_MAIL,
      to: req.body.email,
      subject: `【新規】イベントお申し込み`,
      text: plain,
      attachments:[{
        filename: fname,
        content: buffer,
      }]
    }

    const mail = new MailCore()
    // const response = await mail.send_single(testData)
    const response = await mail.send(userData, admData)

    return res.status(200).json(response)
    
}
