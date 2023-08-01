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
import { Html_Head } from "../components/html-head"
import { PostCard } from "../stories/atrevete/event/PostCard"

const block = css({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  margin: "3em auto"
})
const contentStyle = css({
  margin:'2em',
  fontSize: '1.1em',
  letterSpacing: '0.1em',
  fontSize: '1.1em',
  fontFamily: "'Zen Kaku Gothic New', sans-serif",
  'h1': {
      fontSize: '30px',
  },
  'h2': {
      marginTop: '1em',
      fontSize: '20px',
  },
  'p': {
      marginTop: '0.5em',
  },
  'table': {
      marginTop: '1em',
      borderCollapse:  'collapse',
  },
  'td': {
      padding: '4px 15px',
      borderBottom: 'solid 1px rgba(255,255,255,0.5)',
  },
  'ul, li': {
      marginLeft: '1.2em',
      marginTop: '0.5em',
  }

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
        <div css={contentStyle}>{!data.contentfulPost.content ? false :renderRichText(data.contentfulPost.content, options)}</div>
        {data.contentfulPost.related_event?
        <>
          <Head2 text="関連するイベント" />
          <div>
              {data.contentfulPost.related_event?.map(event => (
                event.eye_catch ? 
                <div key={event.contentful_id}><PostCard type="event" title={event.title} image={event.eye_catch.gatsbyImageData} /></div>
                :
                <div key={event.contentful_id}><PostCard type="event" title={event.title} /></div>
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

export const Head: HeadFC  = ({data}) => (
  <Html_Head title={data.site.siteMetadata.title + " | " + data.contentfulPost.title} type="article" url={data.site.siteMetadata.siteUrl + "/event/" + data.contentfulPost.title}>
  </Html_Head>
)