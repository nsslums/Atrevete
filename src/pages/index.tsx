import * as React from "react"
import { HeadFC, PageProps, graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"

const IndexPage: React.FC<PageProps> = ({data}) => {
  return (
    <div>
      <h2>協賛企業</h2>
      <ul>
        {data.allContentfulSponsor.nodes?.map(sponsor => (
          <a href={sponsor.url} target="_blank" rel="noopener noreferrer"><GatsbyImage image={sponsor.logo.gatsbyImageData} alt={sponsor.name} /></a>
        ))}
      </ul>
    </div>
  )
}

export const query = graphql`
  query {
    allContentfulSponsor(filter: {hidden: {ne: true}}) {
      nodes {
        url
        logo {
          gatsbyImageData
        }
        name
      }
    }
  }
`

export default IndexPage

export const Head: HeadFC = () => <title>Home Page</title>
