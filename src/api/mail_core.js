import request from "request";
const nodemailer = require("nodemailer");
require("dotenv").config();

/**
 * 新規メール
 */

class Response {
	constructor() {
		this.res = {
			status: "init",
		};
	}
}

export class MailCore {
	constructor() {
		this.transporter = nodemailer.createTransport({
			service: "Gmail",
			auth: {
				user: process.env.SMTPUSER,
				pass: process.env.SMTPPASS,
			},
		});
	}

	getRecaptchaScore = token => {
		if (!token) {
			const error = { code: 442, message: "need reCAPTCHA" };
			console.log("mail_Core", error);
			return error;
		}

		const verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRETKEY}&response=${token}`;
		request(verificationUrl, (err, response, body) => {
			if (err) {
				const error = { code: 401, message: "reCAPTCHA request error." };
				console.log("mail_Core", error);
				return error;
			}
			const { success, score } = JSON.parse(body);
			if (!success || score <= 0.5) {
				const error = { code: 400, message: "reCAPTCHA judge failed. Are you robot..?" };
				console.log("mail_Core", error);
				return error;
			}
		});

		return null;
	};

	send_single = async (data, token) => {
		let response = new Response().res;
		const recaptchaErr = this.getRecaptchaScore(token);
		if (recaptchaErr != null) {
			response.status = "error";
			response.error = recaptchaErr;
			return response;
		}

		await this.transporter
			.sendMail(data)
			.then(result => {
				response.status = "success";
			})
			.catch(error => {
				response.status = "error";
				console.log("mail_core", error);
			});
		return response;
	};

	send = async (udata, adata, token) => {
		let response = new Response().res;
		const recaptchaErr = this.getRecaptchaScore(token);
		if (recaptchaErr != null) {
			response.status = "error";
			response.error = recaptchaErr;
			return response;
		}

		// 運営に送信
		await this.transporter
			.sendMail(adata)
			.then(result => {
				response.admin_sendedMail = true;
				response.status = "success";
			})
			.catch(error => {
				response.admin_sendedMail = false;
				response.status = "error";
				console.log("mail_core", error);
			});
		if (response.status == "error") {
			return response;
		}

		// userに送信
		await this.transporter
			.sendMail(udata)
			.then(result => {
				response.user_sendedMail = true;
				response.status = "success";
			})
			.catch(error => {
				response.user_sendedMail = false;
				response.status = "error";
				console.log("mail_core", error);
			});

		if (response.status == "error") {
			const erroEmail = {
				from: process.env.ADMIN_MAIL,
				to: process.env.ADMIN_MAIL,
				subject: `【送信エラー】お客様のメールアドレスに送信出来ませんでした`,
				text: adata.text,
			};
			await this.transporter.sendMail(erroEmail);
		}
		return response;
	};
}
