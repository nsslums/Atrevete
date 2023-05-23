import * as React from "react"
import { HeadFC, Link, PageProps, graphql } from "gatsby"
import { GatsbyImage, IGatsbyImageData, StaticImage } from "gatsby-plugin-image"
import ModalSearch from '../components/modalsearch';
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
  height: "60vh",
  display:"flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  position: "relative"
})

const IndexPage: React.FC<PageProps> = ({data}) => {


  return (
    <Common>
      <>
        <div css={{
          width: "100%",
          height: "100vh",
          position: "relative",
          top: "-98px",
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
          <div css={{marginTop: "5%"}}><GoldButton text="More"/></div>
        </div>
        <div css={categoryBlock}>
          <div><Head1 text="イベント"/></div>
          <Events/>
        </div>
        <div css={categoryBlock}>
          <div><Head1 text="ニュース"/></div>
          <div>
            {data.allContentfulPost.nodes?.map((post: any) => {
              return post.eye_catch ? 
                    <PostCard title={post.title} key={post.contentful_id} image={post.eye_catch.gatsbyImageData}/>
                  :
                    <PostCard title={post.title} key={post.contentful_id} />
              })}
          </div>
        </div>
        <div css={categoryBlock}>
          <div><Head1 text="協賛企業"/></div>
          <ul>
            {data.allContentfulSponsor.nodes?.map((sponsor:any) => (
              <a key={sponsor.contentful_id} href={sponsor.url} target="_blank" rel="noopener noreferrer"><GatsbyImage image={sponsor.logo.gatsbyImageData} alt={sponsor.name} /></a>
            ))}
          </ul>
        </div>
        
        <ModalSearch />

      </>
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
    allContentfulPost(filter: {hidden: {ne: true}}) {
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
