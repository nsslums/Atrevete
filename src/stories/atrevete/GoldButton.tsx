import { css } from '@emotion/react';
import React from 'react';

interface ButtonProps {
  text: string;
  onClick?: () => void;
}

const Style = css`
  color: white;
  background: linear-gradient(20deg,#C5B286,#6A3B05);
  padding: 20px 60px;
  border-radius: 3px;
  &::before {
    content: "";
    background-color: blue;
    width: 100px;
    height: 100px;
  }
  &:hover {
    background: orange;
    box-shadow: 0 0 20px 0 black;
    border: solid 1px rgba(255,255,255,10);
  }
`


export const GoldButton = ({
  text = 'Button',
  ...props 
}: ButtonProps) => {
  return (
    <button type='button' css={Style} {...props}>{text}</button>

  )
}