import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"


const PostPage: React.FC<PageProps> = (props) => {
  console.log(props.pageContext)
  return (
    <p>{props.pageContext.contentful_id}</p>
  )
}

export default PostPage

export const Head: HeadFC = () => <title>Post title</title>
