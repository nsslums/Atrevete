import React from 'react'
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'


export const wrapRootElement = ({ element }) => {
    const key:string = process.env.GATSBY_RECAPTCHA_SITEKEY || ""
    return (
        <GoogleReCaptchaProvider reCaptchaKey={key}>
            {element}
        </GoogleReCaptchaProvider>
    )
}