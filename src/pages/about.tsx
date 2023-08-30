import { css } from '@emotion/react'
import * as React from "react"
import { HeadFC, PageProps, graphql } from "gatsby"
import { Common } from "../components/common"
import { Html_Head } from '../components/html-head'
import { AboutSection } from '../stories/atrevete/AboutSection'
import { motion } from 'framer-motion';
import facepaint from 'facepaint';

const breakpoints = [520, 767, 1100];
const mq = facepaint(breakpoints.map(bp => `@media (min-width: ${bp}px)`))

const rootStyle = css(mq({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginBottom: ['4em','6em','8em'],
}))

const Wrap = css({
    margin: '10em 0em',
    width: '90%',
    maxWidth: '900px',
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

const messageText = css(mq({
    fontWeight: 300,
    width: '90%',
    maxWidth: '660px',
    lineHeight: '40px',
    fontSize: ['16px','18px','20px'],
    alignItems: 'center',
    textAlign: 'center',
    wordBreak: 'keep-all',
    overflowWrap: 'break-word'
}))



const Aboutage: React.FC<PageProps> = ({ data }:any) => {

    return (
        <Common>
            <div css={rootStyle}>

                {/* --- about us (top title) --- */}
                <AboutSection
                    title='Atreveteとは'
                    bgTitle='About us'
                    image={data.img1.childImageSharp.gatsbyImageData}
                    reverse='row-reverse'
                >
                    <p css={{fontSize:'1.7em', lineHeight:'70px', letterSpacing:'0.2em', fontWeight:700}}>
                        迷いを確信に。<br/>
                        夢を現実に。
                    </p>
                </AboutSection>

                {/* --- top message --- */}
                <motion.p
                    css={messageText}
                    initial={{opacity: 0}}
                    whileInView={{opacity: 1}}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 2}}
                >
                    日本の課題でもある<wbr/>「若者の育成をどうしていくか」<wbr/>に着目し、<wbr/>夢ある者、<wbr/>迷いながらも<wbr/>進もうとする者、<wbr/>
                    何をしたらいいか<wbr/>わからない者をサポートします。<br/>
                    迷いがある者は、<wbr/>迷いを確信へ。<br/>
                    希望に満ち溢れる<wbr/>若者が<wbr/>世の中の<wbr/>理不尽に<wbr/>振り回されず、<wbr/>
                    自分自身が主体でいれるよう、<wbr/>全身全霊で<wbr/>「人×人」<wbr/>の場所を提供します。
                </motion.p>
            </div>

            {/* --- mission --- */}
            <AboutSection
                title='ミッション'
                bgTitle='Mission'
                oneWord='人と人を繋ぎ、特別な価値を提供します。'
                image={data.img2.childImageSharp.gatsbyImageData}
            >
                <p css={mq({textAlign:['center','center','center','left']})}>
                    夢や<wbr/>希望を持って<wbr/>生きる若者を<wbr/>応援し、<wbr/>一人ひとりの<wbr/>可能性を<wbr/>最大限に<wbr/>引き出します。<br/>
                    若者<wbr/>の夢と可能性を<wbr/>最大化することが、<wbr/>私たちの<wbr/>ミッションです。<br/>
                    日本の未来に<wbr/>貢献できる<wbr/>人材を<wbr/>育成するために、<wbr/>必要な<wbr/>サポートを<wbr/>提供します。
                </p>
            </AboutSection>

            {/* --- vision --- */}
            <AboutSection
                title='ビジョン'
                bgTitle='Vision'
                oneWord='若き起業家の舞台。'
                image={data.img3.childImageSharp.gatsbyImageData}
                reverse='row-reverse'
            >
                <p css={mq({textAlign:['center','center','center','right']})}>
                    20歳前後で<wbr/>「将来やりたいこと迷いがある」<wbr/>「夢がない」<wbr/>と答える割合は<wbr/>40%~50%<wbr/>というのが<wbr/>今の日本の現状。<br/>
                    そこで、<wbr/>優秀な学生や<wbr/>能力ある<wbr/>若者<wbr/>を起業家、<wbr/>投資家<wbr/>や社会人、<wbr/>様々な<wbr/>業種の方との<wbr/>交友する<wbr/>場所を<wbr/>提供します。<br/>
                    アドバイスを<wbr/>もらったり、<wbr/>投資を受けたり、<wbr/>対等にお話をし、<wbr/>夢ある<wbr/>若者の<wbr/>育成を<wbr/>図ります。
                </p>
            </AboutSection>

            {/* --- origin --- */}
            <AboutSection
                title='オリジン'
                bgTitle='Origin'
                oneWord='ロゴに込めた想い。'
                image={data.img4.childImageSharp.gatsbyImageData}
            >
                <p css={mq({textAlign:['center','center','center','left']})}>
                    私たちの<wbr/>ロゴとして<wbr/>利用している<wbr/>「Atrevete」<wbr/>という言葉は、<wbr/>スペイン語の<wbr/>「思い切って～をする」<wbr/>という<wbr/>動詞から<wbr/>来ています。<br/>
                    「思い切って！」<wbr/>という<wbr/>メッセージを、<wbr/>ロゴに<wbr/>込めました。<br/><br/>
                    また、<wbr/>唯一<wbr/>アクセントのつくEを、<wbr/>特別という<wbr/>意味を持つ<wbr/>Especialと<wbr/>かけています。
                </p>
            </AboutSection>
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
    img1: file(relativePath: {eq: "top.jpg"}) {
        childImageSharp {
          gatsbyImageData(formats: WEBP, placeholder: BLURRED)
        }
    }
    img2: file(relativePath: {eq: "top.jpg"}) {
        childImageSharp {
          gatsbyImageData(formats: WEBP, placeholder: BLURRED)
        }
    }
    img3: file(relativePath: {eq: "top.jpg"}) {
        childImageSharp {
          gatsbyImageData(formats: WEBP, placeholder: BLURRED)
        }
    }
    img4: file(relativePath: {eq: "origin.png"}) {
        childImageSharp {
          gatsbyImageData(formats: WEBP, placeholder: BLURRED)
        }
    }
}
`

export default Aboutage

export const Head: HeadFC =  ({data}:any) => (
    <Html_Head title={data.site.siteMetadata.title + " | About"} type="article" url={data.site.siteMetadata.siteUrl + "/about"}>
    </Html_Head>
  )