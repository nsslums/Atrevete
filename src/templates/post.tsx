import * as React from "react"
import { HeadFC, PageProps, graphql } from "gatsby"
import { renderRichText } from 'gatsby-source-contentful/rich-text'


const PostPage: React.FC<PageProps> = ({data}) => {
    return (
      <main>
        <h1>{data.contentfulPost.title}</h1>
        <h2>概要</h2>
        <div>{renderRichText(data.contentfulPost.content)}</div>
        <h2>タグ</h2>
        <div>
          {data.contentfulPost.metadata.tags.map(tag => (
            <p>{tag.name}</p>
          ))}
        </div>
        <h2>関連イベント</h2>
        <div>
          {data.contentfulPost.related_event.map(event => (
            <p>{event.title}</p>
          ))}
        </div>
      </main>
    )
  }
  
  export const query = graphql`
    query ($contentful_id: String!) {
      contentfulPost(contentful_id: {eq: $contentful_id}) {
        title
        content {
          raw
        }
        metadata {
          tags {
            id
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
