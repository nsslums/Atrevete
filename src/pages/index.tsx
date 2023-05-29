import * as React from "react"
import { HeadFC, Link, PageProps, graphql, navigate } from "gatsby"
import { GatsbyImage, IGatsbyImageData, StaticImage } from "gatsby-plugin-image"
import { Events } from "../components/eventSlide";
import {Common} from "../components/common"
import { GoldButton } from "../stories/atrevete/GoldButton";
import { css } from "@emotion/react";
import { Head1 } from "../stories/atrevete/Head1";
import { PostCard } from "../stories/atrevete/event/PostCard";


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

const categoryBlock = css({
  width: "100%",
  minHeight: "60vh",
  position: "relative"
})

const postCss = css({
  margin: "5px 20px"
})

const IndexPage: React.FC<PageProps> = ({data}) => {

  return (
    <Common>
      <div css={{top: -98, position: "relative"}}>
        <div css={{
          width: "100%",
          height: "100vh",
          position: "relative",
          zIndex: 0
        }}>
          <StaticImage src="../images/top.jpg" alt="TopImage" css={topImage}/>
          <div css={topPhrase}>
            <p css={{fontSize: "40px", fontWeight: 700}}>未来と今をつなぐ</p>
          </div>
        </div>
        <div css={{height: "80vh", display:"flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative"}}>
          <p css={{display: "flex", flexDirection: "column", alignItems: "center", fontSize: "40px", fontWeight: 700, lineHeight: "66px"}}>
            <span>吾輩はネコである。名前はまだない。</span>
            <span>どこで生まれたかとんと見当がつかぬ。</span>
          </p>
          <div css={{marginTop: "5%"}}><GoldButton text="More" onClick={async (e:any) => await navigate("/about")}/></div>
        </div>
        <div css={categoryBlock}>
          <div css={{textAlign: "center"}} ><Head1 text="イベント"/></div>
          <div css={{marginTop: "5em"}}>
            <Events/>
          </div>
        </div>
        <div css={categoryBlock}>
          <div css={{textAlign: "center"}}><Head1 text="ニュース"/></div>
          <div css={{marginTop: "5em", display: "flex", flexDirection: "row", justifyContent: "center"}}>
            {data.allContentfulPost.nodes?.map((post: any) => {
              return post.eye_catch ? 
                    <div css={postCss} key={post.contentful_id}><PostCard title={post.title} image={post.eye_catch.gatsbyImageData}/></div>
                  :
                    <div css={postCss} key={post.contentful_id}><PostCard title={post.title} /></div>
              })}
          </div>
          <div css={{textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center", height: 300}}>
            <GoldButton text="MORE" onClick={async (e:any) => await navigate("/post")}/>
          </div>
        </div>
        <div css={categoryBlock}>
          <div css={{textAlign: "center"}} ><Head1 text="協賛企業"/></div>
          <ul>
            {data.allContentfulSponsor.nodes?.map((sponsor:any) => (
              <a key={sponsor.contentful_id} href={sponsor.url} target="_blank" rel="noopener noreferrer"><GatsbyImage image={sponsor.logo.gatsbyImageData} alt={sponsor.name} /></a>
            ))}
          </ul>
        </div>
      </div>
    </Common>
  )
}

export const query = graphql`
  query {
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

export const Head: HeadFC = () => <title>Home Page</title>
