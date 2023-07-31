import { css } from '@emotion/react'
import * as React from "react"
import { HeadFC, Link, PageProps, graphql } from "gatsby"
import { Common } from "../components/common"
import { Head1 } from "../stories/atrevete/Head1"
import { Html_Head } from '../components/html-head'
import { StaticImage } from 'gatsby-plugin-image'
import { AboutSection } from '../stories/atrevete/AboutSection'
import { motion } from 'framer-motion';

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



const Aboutage: React.FC<PageProps> = ({ data }) => {

    return (
        <Common>
            <div css={rootStyle}>
            <AboutSection 
            title='Atreveteとは'
            text="
                <p style='font-size:1.7em; line-height:70px; letter-spacing:0.2em'>迷いを確信に。<br/>夢を現実に。</p>
            "
            image={data.img1.childImageSharp.gatsbyImageData}
            reverse='row-reverse'></AboutSection>

            <motion.p 
                css={messageText}
                initial={{opacity: 0}}
                whileInView={{opacity: 1}}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 2}}
            >日本の課題でもある「若者の育成をどうしていくか」に着目し、<br/>
            夢ある者、迷いながらも進もうとする者、何をしたらいいかわからない者をサポートします。<br/>
            迷いがある者は、迷いを確信へ。<br/>
            何も決まってない者は、話を聞き少しでも視野を広げます。<br/>
            希望に満ち溢れる若者が世の中の理不尽に振り回されず、自分自身が主体でいれるように全身全霊で「人×人」の場所を提供します。
            </motion.p>
            </div>

            <AboutSection 
            title='ミッション'
            oneWord='人と人を繋ぎ、特別な価値を提供します。'
            text='
                <p>夢や希望を持って生きる若者を応援し、一人ひとりの可能性を最大限に引き出します。<br/>
                若者の夢と可能性を最大化することが、私たちのミッションです。
                日本の未来に貢献できる人材を育成するために、必要なサポートを提供します。</p>
            '
            image={data.img2.childImageSharp.gatsbyImageData}
            ></AboutSection>

            <AboutSection 
            title='ビジョン'
            oneWord='人と人を繋ぎ、特別な価値を提供します。'
            text='
                <p>20歳前後で将来やりたいことに迷いがある。または夢がない。と答える割合は40%~50%というのが今の現状である。<br/>
                そこで優秀な学生や、能力ある若者を起業家、投資家や社会人、様々な業種な方との交友する場所を提供します。<br/>
                アドバイスをもらったり、投資を受けたり、対等にお話をし、
                夢ある若者の育成を図ります。</p>
            '
            image={data.img3.childImageSharp.gatsbyImageData}
            reverse='row-reverse'></AboutSection>
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
}
`

export default Aboutage

export const Head: HeadFC =  ({data}) => (
    <Html_Head title={data.site.siteMetadata.title + " | About"} type="article" url={data.site.siteMetadata.siteUrl + "/about"}>
    </Html_Head>
  )