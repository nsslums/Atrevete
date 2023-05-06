import { Mail } from "./mail";

export default function sendMail(req, res){

    if (!req.body.email) {
        return res.status(422).json("Email is required")
    }
    if (!req.body.subject) {
        return res.status(422).json("subject is required")
    }

    const mail = new Mail(req.body.email, req.body.subject,"");
    try {
        mail.send()
    } catch (error) {
        if(error.message == '422')
        return res.status(422).json("{error: need more data}")
    }
    
    return res.status(200).json("ok")
}