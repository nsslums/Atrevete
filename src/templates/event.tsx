import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"


const EventPage: React.FC<PageProps> = (props) => {
  console.log(props.pageContext)
  return (
    <p>{props.pageContext.contentful_id}</p>
  )
}

export default EventPage

export const Head: HeadFC = () => <title>Event title</title>
