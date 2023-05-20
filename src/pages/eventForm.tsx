import * as React from "react"
import { HeadFC, PageProps, navigate } from "gatsby"
import Select from 'react-select'
import { Pulldown } from "../stories/atrevete/form/Pulldown"
import { Input } from "../stories/atrevete/form/Input"
import { TextArea } from "../stories/atrevete/form/TextArea"
import { UploadFile } from "../stories/atrevete/form/UploadFile"
import { Certifications } from "../stories/atrevete/form/Certifications"
import { Common } from "../components/common"
import { useGoogleReCaptcha } from "react-google-recaptcha-v3"

const FormPage: React.FC<PageProps> = () => {
    const [submitdis, setSubmitdis] = React.useState(false)
    const { executeRecaptcha } = useGoogleReCaptcha()

    const options = [
        { value: 'value1', label: '値1' },
        { value: 'value2', label: '値2' },
        { value: 'value3', label: '値3' },
    ]

    const onSubmit = async (e: any) => {
        e.preventDefault()  // デフォルトの動作のキャンセル
        console.log('submit')
        setSubmitdis(true)

        if(!executeRecaptcha){
            setSubmitdis(false)
            return
        }
        const token = await executeRecaptcha('contact')
        
        const formData = new FormData()
        formData.append("event", e.target.event.value,)
        formData.append("name", e.target.name.value)
        formData.append("birthday", e.target.birthday.value)
        formData.append("university", e.target.university.value)
        formData.append("email", e.target.email.value)
        formData.append("certifications", e.target.certifications_hiddn.value)
        formData.append("career", e.target.career.value)
        formData.append("pr", e.target.pr.value)
        formData.append("instagram", e.target.instagram.value)
        formData.append("tiktok", e.target.tiktok.value)
        formData.append("twitter", e.target.twitter.value)
        formData.append("token", token)
        
        formData.append("file", e.target.file.files[0])

        const response = await window.fetch('/api/event', {
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
            <form action="/api/event" method="post" onSubmit={onSubmit}>
                <Pulldown label="イベント" name="event" id="event" options={options} required={true} />
                <Input label="お名前" type="text" name="name" id="name" required={true} />
                <Input label="誕生日" type="date" name="birthday" id="birthday" required={true} />
                <Input label="メール" type="email" name="email" id="email" required={true} />
                <TextArea label="自己PR" name="pr" id="pr" required={true} />
                <UploadFile required={true} />
                <Input label="大学名" type="text" name="university" id="university" />
                <Certifications label="資格" name="certifications_hiddn" id="certifications" />
                <TextArea label="経歴・学外活動" name="career" id="career" />
                <Input label="Instagram ID" type="text" name="instagram" id="instagram" />
                <Input label="TikTok ID" type="text" name="tiktok" id="tiktok" />
                <Input label="Twitter ID" type="text" name="twitter" id="twitter" />
                <Input type="submit" name="submit" id="submit" disabled={submitdis} />
            </form>
        </Common>
    )
}

export default FormPage

export const Head: HeadFC = () => <title>Form Page</title>