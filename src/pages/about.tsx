import { css } from '@emotion/react'
import * as React from "react"
import { HeadFC, Link, PageProps, graphql } from "gatsby"
import { Common } from "../components/common"
import { Head1 } from "../stories/atrevete/Head1"
import { Html_Head } from '../components/html-head'

const rootStyle = css({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
})
const textStyle = css({
    width: '70%',
    marginTop: '2em',
    fontSize: '1.3em',
    fontWeight: '400',
    letterSpacing: '0.1em',
    textAlign: 'center'
})

const Aboutage: React.FC<PageProps> = () => {

    return (
        <Common>
            <div css={rootStyle}>
            <div css={{textAlign: 'center'}}><Head1 text="Atreveteとは"/></div>

            <p css={textStyle}>
                Atreveteは、学生を中心としたイベントを開催します。<br/>
                日本の課題でもある<br/>
                「若者の育成をどうしていくか」<br/>
                に着目し、夢ある者、迷いながらも進もうとする者、何をしたらいいかわからない者をサポートします。
            </p>
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

export default Aboutage

export const Head: HeadFC =  ({data}) => (
    <Html_Head title={data.site.siteMetadata.title + " | About"} type="article" url={data.site.siteMetadata.siteURL + "/about"}>
    </Html_Head>
  )