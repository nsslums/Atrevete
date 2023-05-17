import { css } from '@emotion/react';
import { motion } from 'framer-motion';

interface MenuLinkProps {
  text: string;
}

const Style = css({
  position: 'relative',
  color: 'white',
  fontSize: '40px',
  '&:hover': {
    color: 'transparent',
    background:'var(--gold-gradient)',
    backgroundClip: 'text',
  }
})

const noiseOverlay = css({
  position: 'absolute',
  top: 1,
  left: 0,
  width: '100%',
  height: '100%',
  color: 'transparent',
  backgroundImage: 'url(src/images/noise.png)',
  backgroundRepeat: 'repeat',
  backgroundSize: '40%',
  backgroundBlendMode: 'color-dodge',
  opacity: '20%',
  backgroundClip: 'text',
})


export const MenuLink = ({
  text,
  ...props
}: MenuLinkProps) => {
  return (
    <button css={Style} {...props}>{text}<span css={noiseOverlay}>{text}</span></button>
  )
}