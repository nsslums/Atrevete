import { css } from '@emotion/react';
import React from 'react';
import { Link } from 'gatsby-link';
import { GatsbyImage, IGatsbyImageData, StaticImage } from 'gatsby-plugin-image';

const rootCss = css({
    width: 770,
    height: 150,
    padding: 10,
    position: "relative",
})

const linkCss = css({
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "row",

})

const imageCss = css({
    width: "100%",
    height: "100%",
    objectFit: "cover",
})

const textCss = css({
    width: "100%",
    textAlign: 'center',
    marginTop: "1em",
    display: "flex",
    alignItems: "center",
    justifyContent: 'center'
})

interface ConnectionProps {
  title: string;
  image?: IGatsbyImageData,
  url?: string,
  mode: "event" | "post",
}

/**
 * Primary UI component for user interaction
 */
export const Connection = ({
  title,
  image,
  mode,
  url = "/"+ mode +  "/"+ title,
}: ConnectionProps) => {
  return (
    <div css={rootCss}>
      <Link to={url} css={linkCss} draggable={false}>
        <div css={textCss}>
            <p>{title}</p>
        </div>
        <div css={{width: "30%"}}>
            {image ? 
              <GatsbyImage css={imageCss} image={image} alt='eyecatch'/>
            :
              <StaticImage src='../../../../static/noimg.png' css={imageCss} alt='eyecatch'/>
            }
        </div>
      </Link>

    </div>
  );
};
