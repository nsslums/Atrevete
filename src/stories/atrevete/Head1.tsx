import { css } from '@emotion/react';
import { motion } from 'framer-motion';
import { relative } from 'path';

interface Head1Props {
  text: string;
}

const Style = css({
  position: 'relative',
  margin: '5px 5px 0.5em 5px',
  fontSize: '50px',
  display: 'inline-block',
})

const bgStyle = css({
  position: 'absolute',
  backgroundImage: 'var(--gold-gradient)',
  width: 'calc(100% + 8px)',
  height: '0.12em',
  left: '-4px',
  bottom: '-0.4em',
  transform: 'skewX(-20deg)',
  '&:after': {
    content: '""',
    position: 'absolute',
    background: 'url(/noise.png)',
    backgroundRepeat: 'repeat',
    backgroundSize: '40%',
    width: '100%',
    height: '0.12em',
    left: 0,
    bottom: 0,
    opacity: '20%',
  }
})


export const Head1 = ({
  text,
}: Head1Props) => {
  return (
    <div css={{position:'relative'}}>
      <motion.h1 initial={{opacity:0}} animate={{opacity:1}} transition={{duration:1}} css={Style}>{text}<motion.span initial={{width:0}} animate={{width: 'calc(100% + 8px)'}} css={bgStyle} ></motion.span></motion.h1>
    </div>
  )
}