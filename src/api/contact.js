import request from "request";
import { MailCore } from "./mail_core";

export default async function sendMail(req, res) {
	if (!req.body.token) {
		const error = { status: "error", error: { code: 442, message: "need reCAPTCHA" } };
		console.log(error);
		return res.status(422).json(error);
	}

	if (!req.body.name) {
		const error = { status: "error", error: { code: 442, message: "need name" } };
		console.log(error);
		return res.status(422).json(error);
	}
	if (!req.body.email) {
		const error = { status: "error", error: { code: 442, message: "need email" } };
		console.log(error);
		return res.status(422).json(error);
	}
	if (!req.body.subject) {
		const error = { status: "error", error: { code: 442, message: "need subject" } };
		console.log(error);
		return res.status(422).json(error);
	}
	if (!req.body.content) {
		const error = { status: "error", error: { code: 442, message: "need content" } };
		console.log(error);
		return res.status(422).json(error);
	}

	const plain = `※このメールはシステムからの自動送信です

お問い合わせ頂きありがとうございます。
以下の内容でお問い合わせを受け付けいたしました。

数日以内にご連絡させていただきます。

━━━━━━━━━━━━ お問い合わせ内容 ━━━━━━━━━━━━
お名前: ${req.body.name}
メールアドレス: ${req.body.email}
件名: ${req.body.subject}
電話番号: ${req.body.phone}
お問い合わせ内容: ${req.body.content}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━


数日後に連絡がない場合は、お手数ですが、
再度以下のメールアドレスまでご連絡ください。
——————————————————————————————
Atrevete
web: atrvt2022.com
メール: contact@atrvt2022.com
——————————————————————————————
`;

	const admData = {
		from: process.env.ADMIN_MAIL,
		to: process.env.ADMIN_MAIL,
		replyTo: req.body.email,
		subject: `【新規】お問い合わせ受け付けのお知らせ`,
		text: plain,
	};

	const userData = {
		from: process.env.ADMIN_MAIL,
		to: req.body.email,
		replyTo: process.env.ADMIN_MAIL,
		subject: `【Atrevete】お問い合わせ受け付けのお知らせ`,
		text: plain,
	};

	const mail = new MailCore();
	// const response = await mail.send_single(testData)
	const response = await mail.send(userData, admData, req.body.token);

	return res.status(200).json(response);
}
