import * as React from "react"
import { HeadFC, Link, PageProps, graphql } from "gatsby"
import { renderRichText } from 'gatsby-source-contentful/rich-text'
import { GatsbyImage } from "gatsby-plugin-image"
import { BLOCKS, INLINES } from "@contentful/rich-text-types"
import { Common } from "../components/common"
import { EventHead } from "../stories/atrevete/event/EventHead"
import { Head3 } from "../stories/atrevete/Head2"
import { css } from "@emotion/react"


const block = css({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  margin: "3em auto"
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

  return (
    <Common>
      <div css={[block, {maxWidth: 770}]}>
        <EventHead title={data.contentfulEvent.title} imageURL="src/images/event.jpg"/>
      </div>
      <div css={[block, {maxWidth: 770}]}>
        <Head3 text="概要"/>
        <div>{!data.contentfulEvent.overview ? false : renderRichText(data.contentfulEvent.overview, options)}</div>
      </div>
      <div css={[block, {maxWidth: 770}]}>
        <Head3 text="募集要件" />
        <div>{!data.contentfulEvent.contentfulEvent ? false : renderRichText(data.contentfulEvent.requirements, options)}</div>
      </div>
      <div css={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        maxWidth: 770,
        margin:"3em auto",
      }}>
        <div css={[block, {width: "50%"}]}>
          <Head3 text="場所" />
          <p>該当者にメールにてご連絡いたします。</p>
        </div>
        <div css={[block, {width: "50%"}]}>
          <Head3 text="日時" />
          <p>{data.contentfulEvent.date}</p>
        </div>
      </div>
      <h2>関連投稿</h2>
      <div>
        {data.contentfulEvent.post?.map(post => (
          <Link to={'/post/' + post.title} key={post.contentful_id}>{post.title}</Link>
        ))}
      </div>
    </Common>
  )
}

export const query = graphql`
  query($contentful_id: String!) {
    contentfulEvent(
      contentful_id: {eq: $contentful_id}
      hidden: {ne: true}
    ) {
      title
      date
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
      }
    }
  }
`

export default EventPage

export const Head: HeadFC = () => <title>Event title</title>
