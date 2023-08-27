import { css } from '@emotion/react';
import React from 'react';
import { GatsbyImage, IGatsbyImageData, StaticImage } from 'gatsby-plugin-image';
import { Link } from 'gatsby-link';
import facepaint from 'facepaint';

interface EventCardProps {

  isActive?: boolean;
  title: string;
  date: string,
  image?: any,
  url?: string,
}

const breakpoints = [520, 767, 1100];
const mq = facepaint(breakpoints.map(bp => `@media (min-width: ${bp}px)`))


const rootStyle = css(mq({
  width: [320, 395],
  height: [300 ,207],
  borderRadius: "5px",
  overflow: 'hidden',
  background: "black",
  position: "relative",
  color: "white",
  fontSize: 16,
  borderWidth: "1px",
  borderStyle: "solid",
  borderTopColor: 'rgba(255,255,255,0.25)',
  borderLeftColor: 'rgba(255,255,255,0.25)',
  borderRightColor: 'rgba(255,255,255,0.1)',
  borderBottomColor: 'rgba(255,255,255,0.1)',
  boxShadow: '0 0 20px rgba(0,0,0,0.5)',
  margin: "auto",
  "&:hover": {
    border: "solid 1px rgba(255,2555,255,0.7)",
    "&:active": {
      borderColor: "rgba(255,255,255,0.4)",
    }
  },

  "&::before": {
    content: '""',
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
    background: "linear-gradient(90.24deg, #000000 0.23%, rgba(0, 0, 0, 0.82) 39.72%, rgba(0, 0, 0, 0) 78.39%)",
    zIndex: 10,
  }
}))

const status_css = css({
  backgroundColor: "#906D3B",
  position: "absolute",
  top: "0",
  left: "0",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "5px 20px",
  borderBottomRightRadius: "5px",
  zIndex: 20
})

const image_css = css({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
})
/**
 * Primary UI component for user interaction
 */
export const EventCard = ({
  title,
  date,
  image,
  url = "/event/",
  isActive = new Date().getTime() < new Date(date).getTime() || date==null,
  ...props
}: EventCardProps) => {

  const status = isActive ? '募集中' : '募集終了';
  return (
    <div css={rootStyle}>
      <Link to={url} css={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }} draggable={false}>
        {image ? 
          <GatsbyImage alt='' image={image.gatsbyImageData} css={image_css}/>
          : 
          <StaticImage alt='eyeCatch' src='../../../../static/noimg.png' css={image_css}/>
        }
        <div css={status_css}>
          <span>{status}</span>
        </div>
        <div css={{
          width: "85%",
          zIndex: 10,

          "&::after": {
            content: '""',
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
          }
        }}>
          <p css={{
            marginBottom: "10px",
            textShadow: "0 0 5px black"
          }}>
            開催日 {date ? <span>{date}</span> : <span>未定</span>}
          </p>
          <p css={{
            fontWeight: "700",
            fontSize: "1.7em",
            textShadow: "0 0 5px black"
          }}>
            {title}
          </p>
        </div>
      </Link>

    </div>
  );
};
