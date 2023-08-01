import * as React from "react"
import { HeadFC, PageProps, graphql, navigate } from "gatsby"
import { GatsbyImage, StaticImage } from "gatsby-plugin-image"
import { Events } from "../components/eventSlide";
import { Common } from "../components/common"
import { GoldButton } from "../stories/atrevete/GoldButton";
import { css } from "@emotion/react";
import { Head1 } from "../stories/atrevete/Head1";
import { PostCard } from "../stories/atrevete/event/PostCard";
import { Html_Head } from '../components/html-head'
import facepaint from 'facepaint';
import { motion } from 'framer-motion';

const breakpoints = [520, 767, 1100];
const mq = facepaint(breakpoints.map(bp => `@media (min-width: ${bp}px)`))

const topImage = css({
  width: "100%",
  height: "100%",
  objectFit: "cover",
})

const topPhrase = css({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 10,
})

const topPhraseText = css({
  fontSize: "40px",
  fontWeight: 700,
  textShadow: "0 0 10px rgba(255, 242, 210, var(--t1))",
  display: 'inline-block',
  background: 'linear-gradient(90deg, white 0%, white var(--p1), transparent var(--p2), transparent 100%)',
  backgroundClip: 'text',
  color: 'transparent',
})

const typoWrap = css(mq({
  margin: ['90px 0', '120px 0', '240px 0'],
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  position: "relative"
}))

const typoStyle = css(mq({
  textAlign: 'center',
  fontSize: ['15px', '25px', '30px'],
  fontWeight: 700,
  lineHeight: ['45px', '55px', '65px']
}))

const categoryBlock = css({
  width: "100%",
  minHeight: "60vh",
  position: "relative"
})

const postCss = css({
  margin: "10px"
})

const IndexPage: React.FC<PageProps> = ({ data }) => {

  return (
    <Common>
      <div css={{ top: -98, position: "relative" }}>
        <div css={{
          width: "100%",
          height: "100vh",
          position: "relative",
          zIndex: 0,
          backgroundColor: "#3e3e3e"
        }}>
          <StaticImage src="../images/top.jpg" alt="TopImage" css={topImage} loading="eager"/>
          {/* --- top phrase --- */}
          <div css={topPhrase}>
            <motion.p
              initial={{'--p1': '-20%', '--p2': '0%'} as any}
              whileInView={{'--p1': ['-20%','100%'], '--p2': ['0%','120%'], '--t1': [0,0,1] } as any}
              viewport={{ once: true }}
              transition={{ duration:1.5, delay: 1 }}
              css={topPhraseText}
            >Special Value for Special  Person</motion.p>
          </div>
        </div>
        <div css={typoWrap}>
          <p css={typoStyle}>
            未来を切り開く若者に、最高の仲間とメンターを。<br />
            あなたの可能性を広げるプラットフォーム
          </p>
          <div css={{ marginTop: "5%" }}><GoldButton text="More" onClick={() => navigate("/about")} /></div>
        </div>
        <div css={categoryBlock}>
          <div css={{ textAlign: "center" }} ><Head1 text="イベント" /></div>
          <div css={{ marginTop: "5em" }}>
            <Events />
          </div>
        </div>
        <div css={categoryBlock}>
          <div css={{ textAlign: "center" }}><Head1 text="ニュース" /></div>
          <div css={{ marginTop: "5em", display: "flex", flexDirection: "row", flexWrap: 'wrap', justifyContent: "center" }}>
            {data.allContentfulPost.nodes?.map((post: any) => {
              return post.eye_catch ?
                <div css={postCss} key={post.contentful_id}><PostCard title={post.title} image={post.eye_catch.gatsbyImageData} /></div>
                :
                <div css={postCss} key={post.contentful_id}><PostCard title={post.title} /></div>
            })}
          </div>
          <div css={{ textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center", height: 300 }}>
            <GoldButton text="MORE" onClick={() => navigate("/post")} />
          </div>
        </div>
        <div css={categoryBlock}>
          <div css={{ textAlign: "center" }}>
            <Head1 text="協賛企業" />
          </div>
          <div
            css={{
              maxWidth: 1200,
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              alignItems: "center",
              margin: "auto",
              marginTop: "5em",
            }}
          >
            {data.allContentfulSponsor.nodes?.map((sponsor: any) => (
              <div
                key={sponsor.contentful_id}
                css={{
                  padding: "1em",
                  flex: "0 0 calc(50% - 2em)",  // スマートフォン表示時の幅を50%に設定
                  margin: "1em",
                  boxSizing: "border-box",
                  '@media (max-width: 767px)': {  // スマートフォン表示のメディアクエリ
                    flex: "0 0 calc(100% - 2em)",  // 幅を100%に設定
                  },
                }}
              >
                <a href={sponsor.url} target="_blank" rel="noopener noreferrer">
                  <GatsbyImage
                    css={{ width: "100%", height: "100%", objectFit: "cover" }}
                    image={sponsor.logo.gatsbyImageData}
                    alt={sponsor.name}
                  />
                </a>
              </div>
            ))}
          </div>
        </div>
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
    allContentfulSponsor(filter: {hidden: {ne: true}}) {
      nodes {
        contentful_id
        url
        logo {
          gatsbyImageData
        }
        name
      }
    }
    allContentfulPost(
      sort: {createdAt: DESC}
      limit: 3
      filter: {hidden: {ne: true}}
    ) {
      nodes {
        contentful_id
        title
        eye_catch{
          gatsbyImageData
        }
      }
    }
  }
`

export default IndexPage

export const Head: HeadFC = ({ data }) => (
  <Html_Head type="website" url={data.site.siteMetadata.siteUrl}>
  </Html_Head>
)