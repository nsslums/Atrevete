import { css } from '@emotion/react';
import { GatsbyImage, StaticImage } from 'gatsby-plugin-image';
import { Head1 } from './Head1';

interface AboutSectionProps {
  title?: string;
  text: string;
  oneWord?: string;
  image: string;
  reverse?: 'row' | 'row-reverse';
}

const Style = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginBottom: '150px',
})

const WrapStyle = css({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'row'
})

const imageStyle = css({
  display: 'box',
  height: '230px',
  margin: '0 60px',
  borderRadius: '3px',
})

const typoStyle = css({
  display: 'box',
  width: '40%',
  lineHeight: '40px',
  textAlign: 'center',
  height: 'fit-content',
  fontSize: '20px',
})

export const AboutSection = ({
  title,
  text = '',
  oneWord,
  reverse = 'row',
  image = '/top.jpg',
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
        <p css={{margin:'70px 0', fontSize:'40px'}}>{oneWord}</p>
        :
        <div css={{margin: '70px'}}></div>
      }
      <div css={[WrapStyle,{flexDirection: `${reverse}`}]}>
        <img css={imageStyle} alt='image' src='/top.jpg'/>
        <div css={typoStyle} {...props}
          dangerouslySetInnerHTML={{
            __html: text
          }}
        ></div>
      </div>
    </div>
  )
}