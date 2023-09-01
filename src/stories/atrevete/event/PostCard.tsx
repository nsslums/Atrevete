import { css } from '@emotion/react';
import React from 'react';
import { Link } from 'gatsby-link';
import { GatsbyImage, IGatsbyImageData, StaticImage } from 'gatsby-plugin-image';
import { type } from 'os';
import { GetSlug } from '../../../api/getSlug';
import facepaint from "facepaint";

const breakpoints = [520, 767, 1100];
const mq = facepaint(breakpoints.map(bp => `@media (min-width: ${bp}px)`))


const rootCss = css(mq({
    position: "relative",
    width: [320, 395],
    height: 207,
    // padding: 10,
    marginBottom: 15,
    border: '.7px solid',
    borderTopColor: 'rgba(255,255,255,0.25)',
    borderLeftColor: 'rgba(255,255,255,0.25)',
    borderRightColor: 'rgba(255,255,255,0.1)',
    borderBottomColor: 'rgba(255,255,255,0.1)',
    borderRadius: 5,
    overflow: 'hidden',
    transition: 'all 0.2s ease',
    "&:hover": {
      border: "solid .7px rgba(255,2555,255,0.7)",
      boxShadow: '0 0 20px rgba(0,0,0,0.5)',
      "&:active": {
        boxShadow: '0 0 20px rgba(0,0,0,0)',
        borderColor: "rgba(255,255,255,0.4)",
      }
    },
}))

const linkCss = css({
    width: "100%",
    height: "100%",
    display: "block",
})

const imageCss = css({
    width: "100%",
    height: "100%",
    objectFit: "cover",
    "&:after": {
        content: '""',
        background: 'linear-gradient(90deg, black, transparent, transparent)',
        position: 'absolute',
        width: '100%',
        height: '100%',
        left: 0,
        bottom: 0,
    }
})

const textCss = css({
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "start",
    position: 'absolute',
    bottom: 0,
    textAlign: 'left',
    fontSize: [12,14,16],
    "> p": {
      textShadow: "0 0 5px black",
      marginLeft: 20,
    }
})

interface EventCardProps {
  node: any;
  image?: IGatsbyImageData,
  type?: 'post' | 'event';
}

/**
 * Primary UI component for user interaction
 */
export const PostCard = ({
  node,
  image,
  type = 'post',
}: EventCardProps) => {
  return (
    <div css={rootCss}>
      <Link to={`/${type}/`+ GetSlug(node)} css={linkCss} draggable={false}>
        <div css={{height:"100%"}}>
            {image ? 
              <GatsbyImage css={imageCss} image={image} alt='eyecatch'/>
            :
              <StaticImage src='../../../../static/noimg.png' css={imageCss} alt='eyecatch'/>
            }
        </div>
        <div css={textCss}>
            <p>投稿：{node.createdAt}</p>
            <p css={{fontSize: "1.7em",fontWeight: '700'}}>{node.title}</p>
            <p css={{fontSize:'.9em',opacity:'.7',marginTop:'.4em'}}>{node.metadata.tags?.map((tag,index) => {

                return 0 < index ? ` / ${tag.name}`  : tag.name
            })}</p>
        </div>
      </Link>

    </div>
  );
};
