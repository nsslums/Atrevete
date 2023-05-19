import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import { Common } from "../components/common"
import { Input } from "../stories/atrevete/form/Input"
import { TextArea } from "../stories/atrevete/form/TextArea"

const FormPage: React.FC<PageProps> = () => {
    const [submitdis, setSubmitdis] = React.useState(false)

    const onSubmit = async (e: any) =>{
        console.log("submit")
        setSubmitdis(true)
        e.preventDefault()  // デフォルトの動作のキャンセル

        const formData = new FormData()
        formData.append("name", e.target.name.value,)
        formData.append("email", e.target.email.value)
        formData.append("subject", e.target.subject.value)
        formData.append("phone", e.target.phone.value)
        formData.append("content", e.target.content.value)

        const response = await window.fetch('/api/contact', {
            method: 'POST',
            body: formData,
        })
        .then(res => res.json())
        console.log(response)
        setSubmitdis(false)
    }

    return (
        <Common>
            <form action="/api/contact" method="post" onSubmit={onSubmit}>
                <Input label="お名前" type="text" name="name" id="name" required={true} />
                <Input label="メール" type="email" name="email" id="email" required={true} />
                <Input label="件名" type="text" name="subject" id="subject" required={true} />
                <Input label="電話" type="tel" name="phone" id="phone"/>
                <TextArea label="ご内容" name="content" id="content" required={true} />
                <Input type="submit" name="submit" id="submit" disabled={submitdis} />
            </form>
        </Common>
    )
}

export default FormPage

export const Head: HeadFC = () => <title>Form Page</title>
