import React from 'react'
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'


export const wrapRootElement = ({ element }) => {
    return (
        <GoogleReCaptchaProvider reCaptchaKey={process.env.GATSBY_RECAPTCHA_SITEKEY as string} language="ja" scriptProps={{
            async: false, // optional, default to false,
            defer: true, // optional, default to false
            appendTo: 'head', // optional, default to "head", can be "head" or "body",
            nonce: undefined // optional, default undefined
          }}>
            {element}
        </GoogleReCaptchaProvider>
    )
}