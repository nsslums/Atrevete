import { MailCore } from "./mail_core";

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
    console.log(req.body)
    console.log(req.files[0])
    const fname = req.files[0].originalname
    const buffer = req.files[0].buffer  // file

    const testData = {
      from: process.env.SMTPUSER,
      to: process.env.TEST_EMAIL_TO,
      subject: `【新規】イベントお申し込み`,
      text: "aaaaa",
      html: "<img src=\"cid:test\" /><p>aaaa</p>",
      attachments:[{
        filename: fname,
        content: buffer,
        cid: "test"
      }]
    }

    const mail = new MailCore()
    const response = await mail.send_single(testData)

    console.log(response)
    return res.status(200).json(response)
    
}