import { css } from '@emotion/react';
import React from 'react';

interface Head1Props {
  text: string;
}

const Style = css({
  position: 'relative',
  '&:before': {
    content: '""',
    position: 'absolute',
    backgroundColor: 'blue',
    width: '100%',
    height: '5px',
    left: 0,
    bottom: '-20px',
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