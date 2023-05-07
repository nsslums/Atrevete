import { Mail } from "./mail";
import { Contact } from "./mailTemplate"

export default async function sendMail(req, res){

    if (!req.body.email) {
        return res.status(422).json("Email is required")
    }
    if (!req.body.subject) {
        return res.status(422).json("subject is required")
    }

    const mailContent = new Contact(req.body.name, req.body.email, req.body.phone, req.body.subject, req.body.content)
    const mail = new Mail(req.body.email, "お問い合わせ" ,req.body.subject, mailContent.plain(), mailContent.html());
    try {
        const result = await mail.send()
        console.log(result)
        return res.status(200).json(JSON.stringify(result))
    } catch (error) {
        if(error.message == '422')
            return res.status(422).json("{error: need more data}")
    }
    
}