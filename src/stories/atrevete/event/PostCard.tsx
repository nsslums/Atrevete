import { css } from '@emotion/react';
import React from 'react';
import { Link } from 'gatsby-link';
import { GatsbyImage, IGatsbyImageData, StaticImage } from 'gatsby-plugin-image';

const rootCss = css({
    width: 320,
    height: 370,
    border: "1px #C5B286 solid",
    padding: 10,
    position: "relative",
})

const linkCss = css({
    width: "100%",
    height: "100%",
    display: "block",
})

const imageCss = css({
    width: "100%",
    height: "100%",
    objectFit: "cover",
})

const textCss = css({
    width: "100%",
    textAlign: 'center',
    marginTop: "1em"
})

interface EventCardProps {
  title: string;
  image?: IGatsbyImageData,
  url?: string,
}

/**
 * Primary UI component for user interaction
 */
export const PostCard = ({
  title,
  image,
  url = "/post/"+title,
}: EventCardProps) => {
  return (
    <div css={rootCss}>
      <Link to={url} css={linkCss} draggable={false}>
        <div css={{height:"45%"}}>
            {image ? 
              <GatsbyImage css={imageCss} image={image} alt='eyecatch'/>
            :
              <StaticImage src='../../../images/noimage.png' css={imageCss} alt='eyecatch'/>
            }
        </div>
        <div css={textCss}>
            <p>{title}</p>
        </div>
      </Link>

    </div>
  );
};
