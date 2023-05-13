import { css } from '@emotion/react';
import React from 'react';

interface ButtonProps {
  text?: string;
  onClick?: () => void;
}

const Style = css({
  position: 'relative',
  padding: '15px 50px',
  minWidth: '250px',
  minHeight: '70',
  fontSize: '32px',
  color: 'black',
  background: 'white',
  backgroundImage: 'none',
  outline: 'none',
  borderRadius: '3px',
  overflow: 'hidden',
  transition: 'ease .2s',
  '&:hover': {
    color: 'white',
    backgroundImage: 'linear-gradient(20deg,#ccb37e,#7e4d16)',
    backgroundRepeat: 'none',
    boxShadow: '0 0 20px 0 black',
    border: 'none',
    transform: 'scale(1.05)',
    // ↓ add noise
    '&:before': {
      content: '""',
      position: 'absolute',
      top:0,
      left:0,
      width: '100%',
      height: '100%',
      color: 'blue',
      background: 'url(src/images/noise.png)',
      backgroundRepeat: 'repeat',
      backgroundSize: '20%',
      borderTop: 'solid 1px rgba(255,255,255,1)!important',
      borderBottom: 'solid 1px transparent',
      borderLeft: 'solid 1px rgba(255,255,255,1)!important',
      borderRight: 'solid 1px transparent',
      borderRadius: '3px',
      opacity: '25%',
    },
  },
  '&:active': {
    transform: 'scale(1)',
    boxShadow: 'none',
    '&:before': {
      content: '""',
      position: 'absolute',
      top:0,
      left:0,
      width: '100%',
      height: '100%',
      color: 'blue',
      background: 'url(src/images/noise.png)',
      backgroundRepeat: 'repeat',
      backgroundSize: '20%',
      borderTop: 'solid 1px rgba(255,255,255,1)',
      borderBottom: 'solid 1px transparent',
      borderLeft: 'solid 1px rgba(255,255,255,1)',
      borderRight: 'solid 1px transparent',
      borderRadius: '3px',
      opacity: '25%',
    },
  }
})


export const GoldButton = ({
  text = 'Button',
  ...props 
}: ButtonProps) => {
  return (
    <button type='button' css={Style} {...props}>{text}</button>
  )
}