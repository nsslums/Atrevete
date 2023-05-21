import * as React from "react"
import { HeadFC, Link, PageProps, graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import { BLOCKS, INLINES } from "@contentful/rich-text-types"
import { Common } from "../components/common"
import { EventCard } from "../stories/atrevete/event/EventCard"


const EventPage: React.FC<PageProps> = ({ data }) => {

  const events = data.allContentfulEvent.nodes

  return (
    <Common>
      {events?.map(event =>(
        <EventCard key={event.contentful_id} title={event.title} url={"/event/" + event.title} date={event.date}/>
      ))}
    </Common>
  )
}


export const query = graphql`
query{
  allContentfulEvent(filter: {hidden: {ne: true}}) {
      nodes {
        date(formatString: "yyyy/M/D")
        title
        contentful_id
      }
    }
}
`
export default EventPage

export const Head: HeadFC = () => <title>Event title</title>
