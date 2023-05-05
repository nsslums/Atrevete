import * as React from "react"
import { HeadFC, PageProps, graphql } from "gatsby"
import { renderRichText } from 'gatsby-source-contentful/rich-text'
import { GatsbyImage } from "gatsby-plugin-image"
import { BLOCKS, INLINES } from "@contentful/rich-text-types"

const EventPage: React.FC<PageProps> = ({data}) => {
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
      <h1>{data.contentfulEvent.title}</h1>
      <h2>概要</h2>
      <div>{renderRichText(data.contentfulEvent.overview, options)}</div>
      <h2>要項</h2>
      <div>{renderRichText(data.contentfulEvent.requirements, options)}</div>
      <h2>開催日</h2>
      <p>{data.contentfulEvent.event_date}</p>
    </main>
  )
}

export const query = graphql`
  query($contentful_id: String!) {
    contentfulEvent(contentful_id: {eq: $contentful_id}) {
      title
      event_date
      overview {
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
      requirements {
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
    }
  }
`

export default EventPage

export const Head: HeadFC = () => <title>Event title</title>
