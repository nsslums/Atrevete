import React from 'react'
import ReactDOM from 'react-dom'
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'


export const wrapRootElement = ({ element }) => {
    return (
      <>
        <GoogleReCaptchaProvider reCaptchaKey={process.env.GATSBY_RECAPTCHA_SITEKEY as string} language="ja" scriptProps={{
              async: false, // optional, default to false,
              defer: true, // optional, default to false
              appendTo: 'head', // optional, default to "head", can be "head" or "body",
              nonce: undefined // optional, default undefined
            }}>
              {element}
          </GoogleReCaptchaProvider>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
        <link href="https://fonts.googleapis.com/css2?family=Zen+Kaku+Gothic+New:wght@400;700&family=Zen+Old+Mincho:wght@400;700&display=swap" rel="stylesheet"></link>
      </>
    )
}

export const replaceHydrateFunction = () => {
    return (element, container) => {
      const root = ReactDOM.createRoot(container)
      root.render(element)
    }
  }