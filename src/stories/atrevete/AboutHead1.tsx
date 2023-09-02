import { css } from '@emotion/react';
import { motion } from 'framer-motion';
import facepaint from 'facepaint';
import motif from '../../../static/motif.svg'

const breakpoints = [520, 767, 1100];
const mq = facepaint(breakpoints.map(bp => `@media (min-width: ${bp}px)`))

interface AboutHead1Props {
  text: string;
  bgText: string;
}

const Style = css(mq({
  position: 'relative',
  margin: '5px 5px 0.5em 5px',
  textAlign: 'center',
  fontSize: [25,30,45],
  fontWeight: '900',
  display: 'inline-block',
  background: 'linear-gradient(120deg, white 0%, white var(--p1), #a18153 var(--p1), #a18153 var(--p2), transparent var(--p2), transparent 100%)',
  backgroundClip: 'text',
  color: 'transparent',
}))

const bgTextStyle = css({
    position: 'absolute',
    top: 'calc(50% - 20px)',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    fontSize: '2em',
    color: 'transparent',
    WebkitTextStroke: '0.5px rgba(255,255,255,0.2)',
    lineHeight: 'normal',
    whiteSpace: 'nowrap',
    zIndex: -1,
})

const motifStyle =css(mq({
    position: 'absolute',
    display: 'block',
    bottom: [-50,-45,-40],
    right: [-90,-70,-50],
    background: 'linear-gradient(120deg, transparent var(--p3), white var(--p3), white var(--p4), transparent var(--p4), transparent 100%)',
    fill: 'white',
    transform: ['scale(calc(var(--sc) * 0.6))', 'scale(calc(var(--sc) * 0.7))', 'scale(var(--sc))'],
    zIndex: -2,
}))

export const AboutHead1 = ({
  text,
  bgText,
}: AboutHead1Props) => {
  return (
    <div css={{position:'relative'}}>
      <motion.h1
        initial={{'--p1': '0%','--p2':'0%'} as any}
        whileInView={{'--p1': '100%','--p2':'110%'} as any}
        viewport={{ once: true }}
        transition={{ ease: 'anticipate',  duration:3 }}
        css={Style}
      >{text}
      <motion.span
        whileInView={{ opacity: [0,0,1] }}
        viewport={{ once: true }}
        transition={{ ease: 'anticipate',  duration:3 }}
        css={bgTextStyle}
      >{bgText}</motion.span></motion.h1>
      <motion.img
        whileInView={{ opacity: [0,0,1], '--sc': [0,0,1] }as any}
        viewport={{ once: true }}
        transition={{ ease: 'anticipate',  duration: 3 }}
        src={motif}
        css={motifStyle}
      ></motion.img>
    </div>
  )
}