import * as React from "react"
import { HeadFC, Link, PageProps, graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import { BLOCKS, INLINES } from "@contentful/rich-text-types"
import { Common } from "../components/common"
import { PostCard } from "../stories/atrevete/event/PostCard"


const EventPage: React.FC<PageProps> = ({ data }) => {

    const posts = data.allContentfulPost.nodes

    return (
        <Common>
            {posts?.map(post => (
                <PostCard key={post.contentful_id} title={post.title} />
            ))}
        </Common>
    )
}


export const query = graphql`
query {
  allContentfulPost(filter: {hidden: {ne: true}}) {
    nodes {
      contentful_id
      title
      eye_catch {
        gatsbyImageData
      }
    }
  }
}
`
export default EventPage

export const Head: HeadFC = () => <title>Event title</title>
