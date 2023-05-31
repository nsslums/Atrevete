import * as React from "react"
import { HeadFC, Link, PageProps, graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import { BLOCKS, INLINES } from "@contentful/rich-text-types"
import { Common } from "../components/common"
import { PostCard } from "../stories/atrevete/event/PostCard"
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

const postsCss = css({
  display: "flex",
  boxSizing: "border-box",
  marginTop: "5em",
})

const postCss = css({
  margin: ".5em 1em"
})

const EventPage: React.FC<PageProps> = ({ data }) => {

    const posts = data.allContentfulPost.nodes

    return (
        <Common>
          <div css={rootCss}>
            <Head1 text="投稿"/>
            <div css={postsCss}>
              {posts?.map(post => (
                <div key={post.contentful_id} css={postCss}>
                  <PostCard title={post.title}/>
                </div>
              ))}
            </div>
          </div>
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
