import * as React from "react"
import { Link, HeadFC, PageProps, graphql } from "gatsby"
import { Common } from "../components/common"
import { Html_Head } from "../components/html-head"

const ThanksPage: React.FC<PageProps> = () => {
  return (
    <Common>
        <p>thanks</p>
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
}
`

export default ThanksPage

export const Head: HeadFC = ({data}) => (
  <Html_Head title={data.site.siteMetadata.title + " | Thanks"} type="article" url={data.site.siteMetadata.siteURL + "/thanks"}>
  </Html_Head>
)