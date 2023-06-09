import * as React from "react"
import { HeadFC, Link, PageProps, graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import { BLOCKS, INLINES } from "@contentful/rich-text-types"
import { Common } from "../components/common"
import { PostCard } from "../stories/atrevete/event/PostCard"
import { css } from "@emotion/react"
import { Head1 } from "../stories/atrevete/Head1"
import { Html_Head } from "../components/html-head"

const rootCss = css({
  display: "flex",
  flexDirection: 'column',
  justifyContent: "center",
  margin: "auto",
  boxSizing: "border-box",
  alignItems: "center",
})

const postsCss = css({
  display: "flex",
  marginTop: "5em",
  width: '100%',
  maxWidth: '1200px',
  justifyContent: 'center',
  flexWrap: 'wrap',
  boxSizing: "border-box",
})

const postCss = css({
  margin: ".5em 1em"
})

const PostsPage: React.FC<PageProps> = ({ data }) => {

    const posts = data.allContentfulPost.nodes

    return (
        <Common>
          <div css={rootCss}>
            <Head1 text="投稿"/>
            <div css={postsCss}>
              {posts?.map(post => (
                <div key={post.contentful_id} css={postCss}>
                  {post.eye_catch ? 
                  <PostCard title={post.title} image={post.eye_catch.gatsbyImageData}/>
                  :  
                  <PostCard title={post.title}/>
                  }
                </div>
              ))}
            </div>
          </div>
        </Common>
    )
}


export const query = graphql`
query {
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
export default PostsPage

export const Head: HeadFC = ({data}) => (
  <Html_Head title={data.site.siteMetadata.title + " | 投稿"} type="article" url={data.site.siteMetadata.siteURL + "/post"}>
  </Html_Head>
)