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
    border: '.7px solid',
    borderTopColor: 'rgba(255,255,255,0.25)',
    borderLeftColor: 'rgba(255,255,255,0.25)',
    borderRightColor: 'rgba(255,255,255,0.1)',
    borderBottomColor: 'rgba(255,255,255,0.1)',
    boxShadow: '0 0 20px rgba(0,0,0,0.5)',
    borderRadius: 5,
    overflow: 'hidden',
    "&:hover": {
      border: "solid 1px rgba(255,2555,255,0.7)",
      "&:active": {
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
      background: 'linear-gradient(rgba(0,0,0,0),rgba(0,0,0,1))',
      position: 'absolute',
      width: '100%',
      height: 70,
      left: 0,
      bottom: 0,
    }
})

const textCss = css({
    width: "100%",
    position: 'absolute',
    bottom: 0,
    textAlign: 'center',
    fontSize: '20px',
    marginBottom: "1em",
    "> p": {
      textShadow: "0 0 5px black",
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
            <p css={{fontWeight: '700'}}>{node.title}</p>
        </div>
      </Link>

    </div>
  );
};
