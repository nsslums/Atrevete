import { HeadFC, PageProps, graphql, navigate } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import { GoldButton } from "../stories/atrevete/GoldButton"
import { Events } from "../components/eventSlide"
import { Head1 } from "../stories/atrevete/Head1"
import { Html_Head } from "../components/html-head"
import { Common } from "../components/common"
import { css } from "@emotion/react"

const rootStyle = css({
    display: "flex",
    margin: '2em 0',
    flexDirection: "column",
    alignItems: "center",
    fontFamily: "'Zen Kaku Gothic New', sans-serif",
})
const Wrap = css({
    display: 'block',
    width: '90%',
    maxWidth: '1000px',
})
const statusStyle = css({
    fontSize: '12px',
    marginLeft: '0.5em'
})
const article = css({
    display: 'block',
    'h1': {
        fontSize: '30px',
    },
    'h2': {
        marginTop: '1em',
        fontSize: '20px',
    },
    'p': {
        marginTop: '0.5em',
    },
    'table': {
        marginTop: '1em',
        borderCollapse:  'collapse',
    },
    'td': {
        padding: '4px 15px',
        borderBottom: 'solid 1px rgba(255,255,255,0.5)',
    },
    'ul, li': {
        listStyle: 'number',
        marginLeft: '1em',
        marginTop: '0.5em',
    }

})

const PrivacyPage: React.FC<PageProps> = ({data}) => {

    return (
        <Common>
        <div css={rootStyle}>
            <div css={Wrap}>
                <div css={{display:'flex', marginBottom:'0.5em'}}>
                    <p css={statusStyle}>{data.allMarkdownRemark.nodes[0].frontmatter.version}</p>
                    <p css={statusStyle}>{data.allMarkdownRemark.nodes[0].frontmatter.date}</p>
                </div>
                    <div css={article}
                        dangerouslySetInnerHTML={{
                        __html: data.allMarkdownRemark.nodes[0].html,
                        }}
                    ></div>
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
    allMarkdownRemark(filter: {frontmatter: {title: {eq: "PrivacyPolicy"}}}) {
        nodes {
          html
          frontmatter {
            version
            date
          }
          tableOfContents(maxDepth: 10)
        }
    }
}
`
  
export default PrivacyPage
  
export const Head: HeadFC = ({data}) => (
    <Html_Head title={data.site.siteMetadata.title + " | プライバシー・ポリシー"} type="article" url={data.site.siteMetadata.siteUrl + "/privacy"}>
    </Html_Head>
)