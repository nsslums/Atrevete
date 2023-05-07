export class Contact{
    /**
     * 
     * @param {string} name 
     * @param {string} email 
     * @param {string} phone 
     * @param {string} subject 
     * @param {string} content 
     */
    constructor(name, email, phone, subject, content){
        this.name = name || ""
        this.email = email || ""
        this.phone = phone || ""
        this.subject = subject || ""
        this.content = content || ""
    }

    plain(){
        return `この度はお問い合わせいただき、誠にありがとうございます。

お客様がご入力された内容を受け付けいたしました。
以下にお客様がご入力された内容を記載いたします。
---
お名前: ${this.name}
メールアドレス: ${this.email}
電話番号: ${this.phone}
件名: ${this.subject}
内容: ${this.content}
---`
    }

    html(){
        return `
            <p>
                この度はお問い合わせいただき、誠にありがとうございます。<br/>
                お客様がご入力された内容を受け付けいたしました。<br/>
                以下にお客様がご入力された内容を記載いたします。
            </p>
            <p>
                お名前: ${this.name}<br/>
                メールアドレス: ${this.email}<br/>
                電話番号: ${this.phone}<br/>
                件名: ${this.subject}<br/>
                内容: ${this.content}<br/>
            </p>
        `
    }
}

export class Common{

    reply_day = 3

    Note_plain(){
        return `\r\n通常${this.reply_day}営業日以内に回答を送信させていただきます。このメールにはご返信頂けません。`
    }

    Note_html(){
        return `<p>通常${this.reply_day}営業日以内に回答を送信させていただきます。このメールにはご返信頂けません。</p>`
    }

    render_html(title, body){
        return `
        <!DOCTYPE html>
        <html lang="ja">
        <head>
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${title}</title>
        </head>
        <body>
            ${body}
        </body>
        </html>
    `
    }
}