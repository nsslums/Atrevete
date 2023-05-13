import { css } from '@emotion/react';
import React from 'react';
import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image';
import { Link } from 'gatsby-link';

interface EventCardProps {

  isActive?: boolean;
  title: string;
  date?: string,
  image?: any,
  url?: string,
}

const rootStyle = css({
  width: "395px",
  height: "207px",
  borderRadius: "5px",
  overflow: 'hidden',
  background: "gray",
  position: "relative",
  color: "white",
  fontSize: "17px",
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: "rgba(255, 255, 255, 0.25)",
  margin: "auto",

  "&:hover": {
    border: "solid 1px white",
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
})

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
  isActive = false,
  title,
  date = '2020/10/10',
  image,
  url = "/event/",
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
        {!image ? false :<GatsbyImage alt='' image={image.gatsbyImageData} css={image_css}/>}
        <div css={status_css}>
          <span>{status}</span>
        </div>
        <div css={{
          width: "85%",
          zIndex: 10
        }}>
          <p css={{
            marginBottom: "10px"
          }}>
            開催日 <span>{date}</span>
          </p>
          <p css={{
            fontWeight: "700",
            fontSize: "35px",
          }}>
            {title}
          </p>
        </div>
      </Link>

    </div>
  );
};
