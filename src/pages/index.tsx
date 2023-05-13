import * as React from "react"
import { HeadFC, Link, PageProps, graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import ModalSearch from '../components/modalsearch';
import { EventCard } from "../stories/atrevete/EventCard";
import GlobalStyle from "../GlobalStyle";
import { Events } from "../components/eventSlide";

const IndexPage: React.FC<PageProps> = ({data}) => {
  return (
    <>
      <GlobalStyle />
      <div>
        <h2>協賛企業</h2>
        <ul>
          {data.allContentfulSponsor.nodes?.map(sponsor => (
            <a href={sponsor.url} target="_blank" rel="noopener noreferrer"><GatsbyImage image={sponsor.logo.gatsbyImageData} alt={sponsor.name} /></a>
          ))}
        </ul>
        <ModalSearch />
        <Events/>
      </div>
    </>
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
