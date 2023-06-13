import { css } from '@emotion/react';
import { GatsbyImage, IGatsbyImageData, StaticImage } from 'gatsby-plugin-image';
import { Head1 } from './Head1';
import { graphql } from 'gatsby';
import facepaint from 'facepaint';

const breakpoints = [520, 767, 1100];
const mq = facepaint(breakpoints.map(bp => `@media (min-width: ${bp}px)`))

interface AboutSectionProps {
  title?: string;
  text: string;
  oneWord?: string;
  image: IGatsbyImageData;
  reverse?: 'row' | 'row-reverse';
  fontSize?: string;
}

const Style = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent:'center',
  marginBottom: '150px',
  width: '100%',
})

const WrapStyle = css(mq({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'row',
  flexWrap: 'wrap',
  width: '90%',
  maxWidth: '900px',
}))

const imageStyle = css({
  display: 'box',
  // width: '60%',
  aspectRatio: '16/9',
  height: '230px',
  margin: '0 60px',
  borderRadius: '3px',
})

const oneWordStyle = css(mq({
  margin:'70px 0', 
  textAlign: 'center',
  fontSize:['30px','35px','40px'],
}))

const typoStyle = css(mq({
  display: 'box',
  width: ['80%','70%', '60%', '40%'],
  lineHeight: '40px',
  textAlign: 'center',
  height: 'fit-content',
  fontSize: ['16px','18px','20px'],
}))

export const AboutSection = ({
  title,
  text = '',
  oneWord,
  reverse = 'row',
  image,
  fontSize,
  ...props
}: AboutSectionProps) => {
  return (
    <div css={Style}>
      {title ?
        <Head1 text={title}></Head1>
        :
        <div></div>
      }
      {oneWord ?
        <p css={oneWordStyle}>{oneWord}</p>
        :
        <div css={{margin: '70px'}}></div>
      }
      <div css={[WrapStyle,{flexDirection: `${reverse}`},]}>
        <GatsbyImage css={imageStyle} alt='image' image={image}/>
        <div css={[typoStyle,{fontSize: `${fontSize}`}]} {...props} dangerouslySetInnerHTML={{__html: text}}></div>
      </div>
    </div>
  )
}
