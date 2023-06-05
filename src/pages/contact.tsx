import * as React from "react"
import { HeadFC, PageProps, navigate } from "gatsby"
import { Common } from "../components/common"
import { Input } from "../stories/atrevete/form/Input"
import { TextArea } from "../stories/atrevete/form/TextArea"
import { useGoogleReCaptcha } from "react-google-recaptcha-v3"
import { css } from "@emotion/react"

const FormPage: React.FC<PageProps> = () => {
    const [submitdis, setSubmitdis] = React.useState(false)
    const { executeRecaptcha } = useGoogleReCaptcha()

    const onSubmit = async (e: any) =>{
        e.preventDefault()  // デフォルトの動作のキャンセル
        console.log("submit")
        setSubmitdis(true)

        if(!executeRecaptcha){
            setSubmitdis(false)
            alert("reCAPTCHA init err.")
            return
        }

        const token = await executeRecaptcha('contact')

        const formData = new FormData()
        formData.append("name", e.target.name.value,)
        formData.append("email", e.target.email.value)
        formData.append("subject", e.target.subject.value)
        formData.append("phone", e.target.phone.value)
        formData.append("content", e.target.content.value)
        formData.append("token", token)

        const response = await window.fetch('/api/contact', {
            method: 'POST',
            body: formData,
        })
        .then(res => res.json())
        console.log(response)
        
        if(response.status === "success"){
            await navigate('/thanks')
        }else{
            alert("エラーが発生しました．")
        }
        setSubmitdis(false)
    }

    return (
        <Common>
            <div css={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginBottom: "5em",
            }}>
                <form action="/api/contact" method="post" onSubmit={onSubmit}>
                    <Input label="お名前" type="text" name="name" id="name" required={true} />
                    <Input label="メール" type="email" name="email" id="email" required={true} />
                    <Input label="件名" type="text" name="subject" id="subject" required={true} />
                    <Input label="電話" type="tel" name="phone" id="phone"/>
                    <TextArea label="ご内容" name="content" id="content" required={true} />
                    <div css={css({
                        marginTop: 30,
                        display: "flex",
                        justifyContent: "center",
                    })}>
                        <Input type="submit" name="submit" id="submit" disabled={submitdis} />
                    </div>
                </form>
            </div>
        </Common>
    )
}

export default FormPage

export const Head: HeadFC = () => <title>Form Page</title>
