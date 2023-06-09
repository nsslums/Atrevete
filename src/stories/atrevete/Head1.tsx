import { css } from '@emotion/react';
import { motion } from 'framer-motion';
import { relative } from 'path';
import facepaint from 'facepaint';

const breakpoints = [520, 767, 1100];
const mq = facepaint(breakpoints.map(bp => `@media (min-width: ${bp}px)`))

interface Head1Props {
  text: string;
}

const Style = css(mq({
  position: 'relative',
  margin: '5px 5px 0.5em 5px',
  fontSize: '50px',
  display: 'inline-block',
  background: 'linear-gradient(120deg, white 0%, white var(--p1), #a18153 var(--p1), #a18153 var(--p2), transparent var(--p2), transparent 100%)',
  backgroundClip: 'text',
  color: 'transparent',
  transform: ['scale(0.7)', 'scale(0.8)', 'scale(1)'],
}))

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
      <motion.h1
        initial={{'--p1': '0%','--p2':'0%'} as any}
        whileInView={{'--p1': '100%','--p2':'110%'} as any}
        viewport={{ once: true }}
        transition={{duration:1}}
        css={Style}
      >{text}<motion.span
        initial={{width:0}}
        whileInView={{width: 'calc(100% + 8px)'}}
        viewport={{ once: true }}
        transition={{duration:1}}
        css={bgStyle}
      ></motion.span></motion.h1>
    </div>
  )
}