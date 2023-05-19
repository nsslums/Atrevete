import { MailCore } from "./mail_core"

export default async function sendMail(req, res){

    if(!req.body.name){
        return res.status(422).json("{status: error, error: {code: 442, message: 'need name'}}")
    }
    if(!req.body.email){
        return res.status(422).json("{status: error, error: {code: 442, message: 'need email'}}")
    }
    if(!req.body.subject){
        return res.status(422).json("{status: error, error: {code: 442, message: 'need subject'}}")
    }
    if(!req.body.content){
        return res.status(422).json("{status: error, error: {code: 442, message: 'need content'}}")
    }

    const plain = `
お名前: ${req.body.name}
メールアドレス: ${req.body.email}
件名: ${req.body.subject}
電話番号: ${req.body.phone}
お問い合わせ内容: ${req.body.content}
`

    const admData = {
        from: process.env.SMTPUSER,
        to: process.env.ADMIN_MAIL,
        replyTo: req.body.email,
        subject: `【新規】お問い合わせ`,
        text: plain,
    }


    const userData = {
        from: process.env.SMTPUSER,
        to: req.body.email,
        subject: `【新規】お問い合わせ`,
        text: plain,
    }

    const mail = new MailCore()
    // const response = await mail.send_single(testData)
    const response = await mail.send(userData, admData)

    return res.status(200).json(response)
    
}