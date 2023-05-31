import * as React from "react"
import { HeadFC, Link, PageProps, graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import { BLOCKS, INLINES } from "@contentful/rich-text-types"
import { Common } from "../components/common"
import { EventCard } from "../stories/atrevete/event/EventCard"
import { css } from "@emotion/react"
import { Head1 } from "../stories/atrevete/Head1"

const rootCss = css({
  display: "flex",
  width: 990,
  flexDirection: 'column',
  justifyContent: "center",
  margin: "auto",
  boxSizing: "border-box",
  alignItems: "center",
})

const eventsCss = css({
  display: "flex",
  boxSizing: "border-box",
  marginTop: "5em",
  flexWrap: "wrap",
  justifyContent: "center",
  alignItems: "center",
})

const eventCss = css({
  margin: "1em 1em"
})

const EventPage: React.FC<PageProps> = ({ data }) => {

  const events = data.allContentfulEvent.nodes

  return (
    <Common>
      <div css={rootCss}>
            <Head1 text="イベント"/>
            <div css={eventsCss}>
              {events?.map(event =>(
                <div  key={event.contentful_id}  css={eventCss}>
                  <EventCard title={event.title} url={"/event/" + event.title} date={event.date}/>
                </div>
              ))}
            </div>
          </div>
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
