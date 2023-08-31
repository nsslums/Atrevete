import * as React from "react"
import { HeadFC, Link, PageProps, graphql, navigate } from "gatsby"
import { Common } from "../components/common"
import { Input } from "../stories/atrevete/form/Input"
import { TextArea } from "../stories/atrevete/form/TextArea"
import { useGoogleReCaptcha } from "react-google-recaptcha-v3"
import { css } from "@emotion/react"
import { Html_Head } from "../components/html-head"
import { Head1 } from "../stories/atrevete/Head1"
import facepaint from 'facepaint';

const breakpoints = [520, 767, 1100];
const mq = facepaint(breakpoints.map(bp => `@media (min-width: ${bp}px)`))

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

const FormPage: React.FC<PageProps> = () => {
    const [submitdis, setSubmitdis] = React.useState(false)
    const { executeRecaptcha } = useGoogleReCaptcha()

    const onSubmit = async (e: any) => {
        e.preventDefault()  // デフォルトの動作のキャンセル
        console.log("submit")
        setSubmitdis(true)

        if (!executeRecaptcha) {
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
            .catch(err => alert("通信に失敗しました."))
        console.log(response)

        if (response?.status === "success") {
            await navigate('/thanks')
        } else {
            response.error.message ? 
                alert(response.error.message)
                :
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
                <Head1 text="お問い合わせ" />
                <form css={{ width: '85%', maxWidth: 600 }} action="/api/contact" method="post" onSubmit={onSubmit}>
                    <Input label="お名前" type="text" name="name" id="name" required={true} />
                    <Input label="メール（半角英数字）" type="email" name="email" id="email" required={true} />
                    <Input label="件名" type="text" name="subject" id="subject" required={true} />
                    <Input label="電話" type="tel" name="phone" id="phone" />
                    <TextArea label="内容" name="content" id="content" required={true} />
                    <div css={css({
                        marginTop: 30,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: 'center',
                        flexDirection: 'column',
                    })}>

                        <p css={{ fontSize: '13px', textAlign: 'center', fontFamily: "'Zen Kaku Gothic New', sans-serif"}}>「Submit」を押す前に<Link css={linkStyle} to="/privacy">プライバシーポリシー</Link>に同意する必要があります。</p>
                        <div css={recapcha}>
                            <p>This site is protected by reCAPTCHA and the Google</p>
                            <p><a css={linkStyle} href="https://policies.google.com/privacy" target="_blank">Privacy Policy</a> and<a css={linkStyle} href="https://policies.google.com/terms" target="_blank">Terms of Service</a> apply.</p>
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
  }
`

export default FormPage

export const Head: HeadFC = ({ data }:any) => (
    <Html_Head title={data.site.siteMetadata.title + " | お問い合わせ"} type="article" url={data.site.siteMetadata.siteUrl + "/contact"}>
    </Html_Head>
)