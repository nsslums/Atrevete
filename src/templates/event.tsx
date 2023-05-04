import * as React from "react"
import { HeadFC, PageProps, graphql } from "gatsby"
import { renderRichText } from 'gatsby-source-contentful/rich-text'


const EventPage: React.FC<PageProps> = ({data}) => {
  return (
    <main>
      <h1>{data.contentfulEvent.title}</h1>
      <h2>概要</h2>
      <div>{renderRichText(data.contentfulEvent.overview)}</div>
      <h2>要項</h2>
      <div>{renderRichText(data.contentfulEvent.requirements)}</div>
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
      }
      requirements {
        raw
      }
    }
  }
`

export default EventPage

export const Head: HeadFC = () => <title>Event title</title>
