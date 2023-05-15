import { css } from '@emotion/react';
import React from 'react';

interface Head1Props {
  text: string;
}

const Style = css({
  position: 'relative',
  fontSize: '50px',
  '&:before': {
    content: '""',
    position: 'absolute',
    backgroundImage: 'linear-gradient(20deg,#ccb37e,#7e4d16)',
    width: 'calc(100% + 8px)',
    height: '0.12em',
    left: '-4px',
    bottom: '-0.4em',
    transform: 'skewX(-20deg)',
  },
  '&:after': {
    content: '""',
    position: 'absolute',
    background: 'url(src/images/noise.png)',
    backgroundRepeat: 'repeat',
    backgroundSize: '40%',
    width: 'calc(100% + 8px)',
    height: '0.12em',
    left: '-4px',
    bottom: '-0.4em',
    transform: 'skewX(-20deg)',
    opacity: '20%',
  }
})


export const Head1 = ({
  text,
}: Head1Props) => {
  return (
    <>
      <h1 css={Style}>{text}</h1>
    </>
  )
}