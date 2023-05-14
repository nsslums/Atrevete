import { css } from '@emotion/react';
import React from 'react';

interface Head3Props {
  text: string;
}

const Style = css({
  position: 'relative',
  padding: "5px 10px",
  minWidth: "125px",
  textAlign: 'center',
  display: 'inline-block',

  "&::after": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "linear-gradient(264.42deg, rgba(106, 59, 5, 0.89) 0%, rgba(106, 59, 5, 0.54) 61.46%, rgba(106, 59, 5, 0.37) 100%), #C5B286",
    transform: "matrix(1, 0, -0.25, 0.97, 0, 0)",
    zIndex: 0,
  }
})


export const Head3 = ({
  text,
}: Head3Props) => {
  return <h3 css={Style} className='bg_noise'><div css={{zIndex: 10, position: "relative"}}>{text}</div></h3>
}