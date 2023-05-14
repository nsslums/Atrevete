import { css } from '@emotion/react';
import React from 'react';

interface Head3Props {
  text: string;
}

const Style = css({
  position: 'relative',
  background: "linear-gradient(264.42deg, rgba(106, 59, 5, 0.89) 0%, rgba(106, 59, 5, 0.54) 61.46%, rgba(106, 59, 5, 0.37) 100%), #C5B286",
  padding: "5px 10px",
  maxWidth: "125px",
  textAlign: 'center',
})


export const Head3 = ({
  text,
}: Head3Props) => {
  return  <h3 css={Style}>{text}</h3>
}