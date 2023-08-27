import * as React from "react"
import { HeadFC, Link, PageProps, graphql, navigate } from "gatsby"
import { renderRichText } from 'gatsby-source-contentful/rich-text'
import { GatsbyImage } from "gatsby-plugin-image"
import { BLOCKS, INLINES } from "@contentful/rich-text-types"
import { Common } from "../components/common"
import { EventHead } from "../stories/atrevete/event/EventHead"
import { Head2 } from "../stories/atrevete/Head2"
import { css } from "@emotion/react"
import { EventFormCard } from "../stories/atrevete/event/EventFormCard"
import { Connection } from "../stories/atrevete/event/Connection"
import { Html_Head } from "../components/html-head"
import facepaint from 'facepaint';
import { PostCard } from "../stories/atrevete/event/PostCard"

const breakpoints = [520, 767, 1100];
const mq = facepaint(breakpoints.map(bp => `@media (min-width: ${bp}px)`))

const Wrap = css({
  display: 'flex',
  flexDirection:'column',
  justifyContent: 'center',
})

const block = css({
  position: "relative",
  display: "flex",
  maxWidth: '900px',
  width: '80%',
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  margin: "3em auto"
})

const horizon = css(mq({
  display: 'flex',
  flexDirection: ['column','row'],
  alignItems: 'flex-start',
  width: '80%',
  margin: '0 auto',
}))

const textStyle = css({
  letterSpacing: '0.1em',
  fontSize: '1.1em',
  fontFamily: "'Zen Kaku Gothic New', sans-serif",
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
      marginLeft: '1.2em',
      marginTop: '0.5em',
  }

})

const EventPage: React.FC<PageProps> = ({ data }) => {
  const options = {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: ({ data }) => {
        const { gatsbyImageData } = data.target
        if (!gatsbyImageData) {
          // asset is not an image
          return null
        }
        return <GatsbyImage image={gatsbyImageData} alt={""} />
      },
      [BLOCKS.EMBEDDED_ENTRY]: ({ data }) => {
        let link;
        if (data.target.__typename == "ContentfulEvent")
          link = `/event/${data.target.title}`
        else if (data.target.__typename == "ContentfulPost")
          link = `/post/${data.target.title}`
        else
          return null
        return (
          <div>
            <Link to={link}>{data.target.title}</Link>
          </div>
        )
      },
      [INLINES.ENTRY_HYPERLINK]: ({ data }) => {
        let link;
        if (data.target.__typename == "ContentfulEvent")
          link = `/event/${data.target.title}`
        else if (data.target.__typename == "ContentfulPost")
          link = `/post/${data.target.title}`
        else
          return null
        return (
          <div>
            <Link to={link}>{data.target.title}</Link>
          </div>
        )
      },
      [INLINES.ASSET_HYPERLINK]: ({ data }) => {
        return (
          <a href={data.target.url} target="_blank" rel="noopener noreferrer nofollow">{data.target.title}</a>
        )
      }, [INLINES.EMBEDDED_ENTRY]: ({ data }) => {
        let link;
        if (data.target.__typename == "ContentfulEvent")
          link = `/event/${data.target.title}`
        else if (data.target.__typename == "ContentfulPost")
          link = `/post/${data.target.title}`
        else
          return null
        return (
          <Link to={link}>{data.target.title}</Link>
        )
      }
      ,
    },
  }
  
  const title = data.contentfulEvent.title

  const  navigation = async (e:any) =>{
    await navigate("/eventForm", { state: { event: title } })
  }

  const start_reception = data.contentfulEvent.start_reception || ""
  const end_reception = data.contentfulEvent.end_reception || ""
  const date = data.contentfulEvent.date || ""
  return (
    <Common>
      <div css={Wrap}>
        <div css={[block]}>
          {data.contentfulEvent.eye_catch ?
            <EventHead title={title} imageURL="src/images/event.jpg" date={data.contentfulEvent.date} GatsbyImageData={data.contentfulEvent.eye_catch.gatsbyImageData}/>      
          :
          <EventHead title={title} imageURL="src/images/event.jpg" date={data.contentfulEvent.date} />      
          }
        </div>
        <div css={[block]}>
          <Head2 text="概要"/>
          <div css={textStyle}>{!data.contentfulEvent.overview ? false : renderRichText(data.contentfulEvent.overview, options)}</div>
        </div>
        <div css={[block]}>
          <Head2 text="募集要件" />
          <div css={textStyle}>{!data.contentfulEvent.requirements ? false : renderRichText(data.contentfulEvent.requirements, options)}</div>
        </div>
        <div css={horizon}>
          <div css={[block, {width: "50%"}]}>
            <Head2 text="場所" />
            <p css={textStyle}>該当者にメールにてご連絡いたします。</p>
          </div>
          <div css={[block, {width: "50%"}]}>
            <Head2 text="日時" />
            {date ? <p css={textStyle}>{date}</p> : <p css={textStyle}>未定</p>}
          </div>
        </div>
        <div css={[block]}>
          <EventFormCard start_date={start_reception} end_date={end_reception} onClick={navigation}/>
        </div>
        {data.contentfulEvent.post ? 
          <div css={[block, {maxWidth: 770}]}>
            <Head2 text="イベントに関連する記事" />
            <div css={{
              }}>
              {data.contentfulEvent.post?.map(post => (
                post.eye_catch ? 
                <div key={post.contentful_id}><PostCard title={post.title} image={post.eye_catch.gatsbyImageData} /></div>
                :
                <div key={post.contentful_id}><PostCard title={post.title} /></div>
              ))}
            </div>
          </div>
        : false  
        }
      </div>
    </Common>
  )
}

export const query = graphql`
  query($contentful_id: String!) {
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
    contentfulEvent(
      contentful_id: {eq: $contentful_id}
      hidden: {ne: true}
    ) {
      title
      end_reception(formatString: "yyyy/M/D")
      start_reception(formatString: "yyyy/M/D")
      date(formatString: "yyyy/M/D")
      overview {
        raw
        references {
          ... on ContentfulAsset {
            contentful_id
            __typename
            gatsbyImageData
            url
            title
          }
          ... on ContentfulEvent {
            contentful_id
            __typename
            title
          }
          ... on ContentfulPost {
            contentful_id
            __typename
            title
          }
        }
      }
      requirements {
        raw
        references {
          ... on ContentfulAsset {
            contentful_id
            __typename
            gatsbyImageData
            url
            title
          }
          ... on ContentfulEvent {
            contentful_id
            __typename
            title
          }
          ... on ContentfulPost {
            contentful_id
            __typename
            title
          }
        }
      }
      post {
        contentful_id
        title
        eye_catch{
          gatsbyImageData
        }
      }
      eye_catch {
        gatsbyImageData
      }
    }
  }
`

export default EventPage

export const Head: HeadFC = ({data}) => (
  <Html_Head title={data.site.siteMetadata.title + " | " + data.contentfulEvent.title} type="article" url={data.site.siteMetadata.siteUrl + "/event/" + data.contentfulEvent.title}>
  </Html_Head>
)