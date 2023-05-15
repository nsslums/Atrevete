import { css } from '@emotion/react';
import React from 'react';

interface Head2Props {
  text: string;
}

const Style = css({
  position: 'relative',
  padding: "5px 10px",
  minWidth: "125px",
  textAlign: 'center',
  display: 'inline-block',
  margin: "2em 0",
  
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundImage: 'linear-gradient(20deg,#ccb37e,#7e4d16)',
    transform: "skewX(-20deg)",
  },
  "&:after": {
    transform: 'skewX(-20deg)',
  }
})


export const Head2 = ({
  text,
}: Head2Props) => {
  return <h3 css={Style} className='bg_noise'><div css={{zIndex: 10, position: "relative"}}>{text}</div></h3>
}