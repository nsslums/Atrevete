import * as React from "react"
import { HeadFC, Link, PageProps, graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import { BLOCKS, INLINES } from "@contentful/rich-text-types"
import { Common } from "../components/common"
import { EventCard } from "../stories/atrevete/event/EventCard"
import { css } from "@emotion/react"
import { Head1 } from "../stories/atrevete/Head1"
import { Html_Head } from "../components/html-head"
import { GetSlug } from "../api/getSlug"
import PeopleProfile from "../stories/atrevete/peopleProfile"

const rootCss = css({
  display: "flex",
  maxWidth: 'min(90vw, 990px)',
  flexDirection: 'column',
  justifyContent: "center",
  margin: "auto",
  boxSizing: "border-box",
  alignItems: "center",
  position: 'relative',
})

const attendeesCss = css({
  display: "flex",
  boxSizing: "border-box",
  marginTop: "5em",
  flexWrap: "wrap",
  justifyContent: "center",
  alignItems: 'stretch',
})

const attendeePage: React.FC<PageProps> = ({ data }:any) => {

  return (
    <Common>
      <div css={rootCss}>
        <Head1 text="Attendee"/>
        <div css={attendeesCss}>
        {data.allContentfulAttendee.nodes?.map((people: any) => {
          return (
            <div key={people.contentful_id} css={css({
              position: "relative",
            })}>
              <PeopleProfile name={people.name} image={people.profileImg?.gatsbyImageData} profile={people.description}  isStaff={people.profileType} />
            </div>
          )
          })}
        </div>
      </div>
    </Common>
  )
}


export const query = graphql`
query{
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
    allContentfulAttendee: allContentfulPeople(filter: {profileType: {eq: false}, hidden: {ne: true}}) {
      nodes {
        contentful_id
        name
        description {
          raw
        }
        profileType
        profileImg {
          gatsbyImageData
        }
      }
    }
}
`

export default attendeePage

export const Head: HeadFC =  ({data}:any) => (
  <Html_Head title={data.site.siteMetadata.title + " | 参加者"} type="article" url={data.site.siteMetadata.siteUrl + "/attendee"}>
  </Html_Head>
)