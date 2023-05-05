import * as React from "react"
import { HeadFC, Link, PageProps, graphql } from "gatsby"
import { renderRichText } from 'gatsby-source-contentful/rich-text'
import { GatsbyImage } from "gatsby-plugin-image"
import { BLOCKS, INLINES } from "@contentful/rich-text-types"

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
    <main>
      <h1>{data.contentfulPost.title}</h1>
      <h2>内容</h2>
      <div>{renderRichText(data.contentfulPost.content, options)}</div>
      <h2>タグ</h2>
      <div>
        {data.contentfulPost.metadata.tags?.map(tag => (
          <p key={tag.contentful_id}>{tag.name}</p>
        ))}
      </div>
      <h2>関連イベント</h2>
      <div>
        {data.contentfulPost.related_event?.map(event => (
          <Link to={'/event/' + event.title} key={event.contentful_id}>{event.title}</Link>
        ))}
      </div>
    </main>
  )
}

export const query = graphql`
    query ($contentful_id: String!) {
      contentfulPost(
        contentful_id: {eq: $contentful_id}
        hidden: {ne: true}
      ) {
        title
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
      }
    }
  `

export default PostPage

export const Head: HeadFC = () => <title>Post title</title>
