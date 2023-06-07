import { css } from '@emotion/react'
import * as React from "react"
import { HeadFC, Link, PageProps, graphql } from "gatsby"
import { Common } from "../components/common"
import { Head1 } from "../stories/atrevete/Head1"
import { Html_Head } from '../components/html-head'
import { StaticImage } from 'gatsby-plugin-image'

const rootStyle = css({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
})

const Wrap = css({
    margin: '10em 0em',
    width: '90%',
    maxWidth: '1200px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
})

const topText = css({
    width: '60%',
    fontSize: '2.2em',
    fontWeight: '400',
    letterSpacing: '0.1em',
    textAlign: 'center',
})

const messageText = css({
    marginBottom: '10em',
    fontWeight: 300,
    width: '90%',
    maxWidth: '660px',
    lineHeight: '40px',
    fontSize: '20px',
    alignItems: 'center',
    textAlign: 'center'
})



const Aboutage: React.FC<PageProps> = () => {

    return (
        <Common>
            <div css={rootStyle}>
            <div css={{textAlign: 'center'}}><Head1 text="Atreveteとは"/></div>
            <div css={Wrap}>
            <p css={topText}>私たちは人と人を繋ぎ、<br />特別な価値を提供します。</p>
            <StaticImage src="../images/top.jpg" css={{width: '40%'}} alt={''} />
            </div>
            <p css={messageText}>日本の課題でもある「若者の育成をどうしていくか」に着目し、<br/>
            夢ある者、迷いながらも進もうとする者、何をしたらいいかわからない者をサポートします。<br/>
            迷いがある者は、迷いを確信へ。<br/>
            何も決まってない者は、話を聞き少しでも視野を広げます。<br/>
            希望に満ち溢れる若者が世の中の理不尽に振り回されず、自分自身が主体でいれるように全身全霊で「人　×　人」の場所を提供します。</p>
            </div>
            <div css={{textAlign: 'center'}}><Head1 text="ミッション"/></div>
                <p css={{margin: '3em', textAlign: 'center',fontSize: '30px'}}>会社がどのような像を描いているのかを一言で</p>
                <div css={Wrap}>
                    <StaticImage src='../images/top.jpg' css={{width: '40%'}} alt={''}/>
                    <p css={{width: '60%'}}>具体的に何をしているかなど詳しい説明をつらつら…</p>
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