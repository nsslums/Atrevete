import * as React from "react"
import { HeadFC, Link, PageProps, graphql, navigate } from "gatsby"
import Select from 'react-select'
import { Pulldown } from "../stories/atrevete/form/Pulldown"
import { Input } from "../stories/atrevete/form/Input"
import { TextArea } from "../stories/atrevete/form/TextArea"
import { UploadFile } from "../stories/atrevete/form/UploadFile"
import { Certifications } from "../stories/atrevete/form/Certifications"
import { Common } from "../components/common"
import { useGoogleReCaptcha } from "react-google-recaptcha-v3"
import { css } from "@emotion/react"
import { Html_Head } from "../components/html-head"
import { Head1 } from "../stories/atrevete/Head1"

const linkStyle = css({
    padding: '0.5em',
    color: 'skyblue',
})

const recapcha = css({
    fontFamily: "'Zen Kaku Gothic New', sans-serif",
    marginTop: "20px",
    textAlign: "center",
    fontSize: "0.75rem",
    color: "gray",
})

const FormPage: React.FC<PageProps> = (props) => {
    const [submitdis, setSubmitdis] = React.useState(false)
    const { executeRecaptcha } = useGoogleReCaptcha()

    const data = props.data
    const propsEvent = props.location.state?.event || ""

    const events = data.allContentfulEvent.nodes?.filter((event: any) => {
        if (!event.start_reception)   // 受け付け開始 未入力
            return false

        const startDate = new Date(event.start_reception)   // 受け付け開始 前
        if (startDate.getTime() > new Date().getTime())
            return false

        if (event.end_reception && new Date(event.end_reception).getTime() < new Date().getTime())// 受け付け終了後
            return false

        return true
    })

    const options = events.map((event: any) => {
        return { value: event.title, label: event.title }
    })

    const default_value = { value: propsEvent, label: propsEvent };

    const onSubmit = async (e: any) => {
        e.preventDefault()  // デフォルトの動作のキャンセル
        console.log('submit')
        setSubmitdis(true)

        if (!executeRecaptcha) {
            setSubmitdis(false)
            alert("reCAPTCHA init err.")
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
            .catch(err => alert("通信に失敗しました."))
        console.log(response)

        if (response?.status === "success") {
            await navigate('/thanks')
        } else {
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
                <Head1 text="イベント申込" />
                <form css={{ width: '85%', maxWidth: 600 }} action="/api/event" method="post" onSubmit={onSubmit}>
                    <Pulldown label="イベント" name="event" id="event" options={options} default_val={default_value} required={true} />
                    <Input label="お名前" type="text" name="name" id="name" required={true} />
                    <Input label="誕生日" type="date" name="birthday" id="birthday" required={true} />
                    <Input label="メール" type="email" name="email" id="email" required={true} />
                    <TextArea label="自己PR" name="pr" id="pr" required={true} />
                    <div css={css({
                        marginTop: 30,
                    })}>
                        <UploadFile required={true} />
                    </div>
                    <Input label="大学名" type="text" name="university" id="university" />
                    <Certifications label="資格" name="certifications_hiddn" id="certifications" />
                    <TextArea label="経歴・学外活動" name="career" id="career" />
                    <Input label="Instagram ID" type="text" name="instagram" id="instagram" />
                    <Input label="TikTok ID" type="text" name="tiktok" id="tiktok" />
                    <Input label="Twitter ID" type="text" name="twitter" id="twitter" />
                    <div css={css({
                        display: "flex",
                        marginTop: 30,
                        flexDirection: "column",
                        alignItems: "center",
                        marginBottom: "5em",
                    })}>
                        <p css={{ fontSize: '13px', textAlign: 'center', fontFamily: "'Zen Kaku Gothic New', sans-serif",}}>「Submit」を押す前に<Link css={linkStyle} to="/privacy">プライバシーポリシー</Link>に同意する必要があります。</p>
                        <div css={recapcha}>
                            <p>This site is protected by reCAPTCHA and the Google</p>
                            <p><a css={linkStyle} href="https://policies.google.com/privacy" target="_blank">Privacy Policy</a> and<a css={linkStyle} href="https://policies.google.com/terms" starget="_blank">Terms of Service</a> apply.</p>
                        </div>
                        <Input type="submit" name="submit" id="submit" disabled={submitdis} />
                    </div>
                </form>
            </div>
        </Common>
    )
}

export const query = graphql`
  query {
    site {
        siteMetadata {
            title
            description
            siteUrl
            social{
                twitter
            }
        }
    }
  allContentfulEvent(filter: {hidden: {ne: true}}) {
    nodes {
      title
      end_reception(formatString: "yyyy/M/D")
      start_reception(formatString: "yyyy/M/D")
    }
  }
}
`

export default FormPage

export const Head: HeadFC = ({ data }) => (
    <Html_Head title={data.site.siteMetadata.title + " | イベント応募"} type="article" url={data.site.siteMetadata.siteURL + "/eventForm"}>
    </Html_Head>
)