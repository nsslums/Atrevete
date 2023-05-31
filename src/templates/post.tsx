import * as React from "react"
import { HeadFC, Link, PageProps, graphql } from "gatsby"
import { renderRichText } from 'gatsby-source-contentful/rich-text'
import { GatsbyImage } from "gatsby-plugin-image"
import { BLOCKS, INLINES } from "@contentful/rich-text-types"
import { Common } from "../components/common"
import { css } from "@emotion/react"
import { PostHead } from "../stories/atrevete/PostHead"
import { Connection } from "../stories/atrevete/event/Connection"
import { Head2 } from "../stories/atrevete/Head2"


const block = css({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  margin: "3em auto"
})

const PostPage: React.FC<PageProps> = ({ data }) => {

  const options = {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: ({data}) => {
        const { gatsbyImageData } = data.target
        if (!gatsbyImageData) {
          // asset is not an image
          return null
        }
        return <GatsbyImage image={gatsbyImageData} alt={""} />
      },
      [BLOCKS.EMBEDDED_ENTRY]: ({data}) =>{
        let link;
        if(data.target.__typename == "ContentfulEvent")
          link = `/event/${data.target.title}`
        else if(data.target.__typename == "ContentfulPost")
          link = `/post/${data.target.title}`
        else
          return null
        return  (
          <div>
            <Link to={link}>{data.target.title}</Link>
          </div>
        )
      },
      [INLINES.ENTRY_HYPERLINK]: ({data}) =>{
        let link;
        if(data.target.__typename == "ContentfulEvent")
          link = `/event/${data.target.title}`
        else if(data.target.__typename == "ContentfulPost")
          link = `/post/${data.target.title}`
        else
          return null
        return  (
          <div>
            <Link to={link}>{data.target.title}</Link>
          </div>
        )
      },
      [INLINES.ASSET_HYPERLINK]: ({data}) =>{
        return  (
          <a href={data.target.url} target="_blank" rel="noopener noreferrer nofollow">{data.target.title}</a>
        )
      },[INLINES.EMBEDDED_ENTRY]: ({data}) =>{
        let link;
        if(data.target.__typename == "ContentfulEvent")
          link = `/event/${data.target.title}`
        else if(data.target.__typename == "ContentfulPost")
          link = `/post/${data.target.title}`
        else
          return null
        return  (
            <Link to={link}>{data.target.title}</Link>
        )
      }
      ,
    },
  }

  return (
    <Common>
      <div css={[block, {maxWidth: 770}]}>
        {data.contentfulPost.eye_catch ?
          <PostHead title={data.contentfulPost.title} date={data.contentfulPost.createdAt} GatsbyImageData={data.contentfulPost.eye_catch.gatsbyImageData} tags={data.contentfulPost.metadata.tags || []}/>
        :
          <PostHead title={data.contentfulPost.title} date={data.contentfulPost.createdAt} tags={data.contentfulPost.metadata.tags || []}/>
        }
        <div>{!data.contentfulPost.content ? false :renderRichText(data.contentfulPost.content, options)}</div>
        {data.contentfulPost.related_event?
        <>
          <Head2 text="関連するイベント" />
          <div css={{border: "1px solid white", borderRadius: 15}}>
              {data.contentfulPost.related_event?.map(event => (
                event.eye_catch ? 
                  <Connection key={event.contentful_id} title={event.title} mode="event" image={event.eye_catch.gatsbyImageData}/>
                :
                  <Connection key={event.contentful_id} title={event.title} mode="event" />
              ))}
          </div>
        </>
          : false
        }
      </div>
    </Common>
  )
}

export const query = graphql`
    query ($contentful_id: String!) {
      contentfulPost(
        contentful_id: {eq: $contentful_id}
        hidden: {ne: true}
      ) {
        title
        createdAt(formatString: "yyyy/MM/DD")
        content {
          raw
          references {
            ... on ContentfulAsset {
              contentful_id
              __typename
              gatsbyImageData
              url
              title
            }
            ... on ContentfulEvent {
              contentful_id
              __typename
              title
            }
            ... on ContentfulPost {
              contentful_id
              __typename
              title
            }
          }
        }
        metadata {
          tags {
            contentful_id
            name
          }
        }
        related_event {
          contentful_id
          title
        }
        eye_catch{
          gatsbyImageData
        }
      }
    }
  `

export default PostPage

export const Head: HeadFC = () => <title>Post title</title>
