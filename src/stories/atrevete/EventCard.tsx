import { css } from '@emotion/react';
import React from 'react';
import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image';
import { Link } from 'gatsby-link';

interface EventCardProps {

  isActive?: boolean;
  title: string;
  date?: string,
  image?: IGatsbyImageData,
  url?: string
}

const rootStyle = css({
  width: "395px",
  height: "207px",
  borderRadius: "5px",
  overflow: 'hidden',
  backgroundColor: "gray",
  position: "relative",
  color: "white",
  fontSize: "17px",
  borderWidth: "1px 0px 0px 1px",
  borderStyle: "solid",
  borderColor: "rgba(255, 255, 255, 0.25)",
  boxSizing: "content-box",

  "&:hover": {
    border: "solid 1px white",
  }
})

const status_css = css({
  backgroundColor: "#C5B286",
  position: "absolute",
  top: "0",
  left: "0",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "5px 20px",
  borderBottomRightRadius: "5px",
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
      }} >
        <GatsbyImage alt='' image={undefined} />
        <div css={status_css}>
          <span>{status}</span>
        </div>
        <div css={{
          width: "80%",
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
