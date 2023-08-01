import React from 'react';
import { GatsbyImage, IGatsbyImageData, StaticImage } from "gatsby-plugin-image"
import { css } from '@emotion/react';
import { Head1 } from './Head1';

interface PostHeadProps{
    title?: string,
    date: string,
    imageURL?: string,
    GatsbyImageData?: IGatsbyImageData,
    tags: any
}

const eyeCatch = css({
    margin: '2em 0',
    height: "200px",
})

const imageCss = css({
    height: "100%",
    width: "100%",
    objectFit: "cover",
})

const rootCss = css({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
})


export const PostHead = ({
    title = "イベント名",
    date,
    imageURL,
    GatsbyImageData,
    tags = [],
}: PostHeadProps) =>{
    return(
        <div css={rootCss}>
            <Head1 text={title}></Head1>
            <p css={{marginTop: '1em'}}>
                {date}
                {tags ? 
                <div>
                {tags.map(tag => (
                    <span key={tag.contentful_id}>{tag.name}</span>
                ))}   
                </div>
                 : false}
            </p>
            
            <div css={eyeCatch}>
                {GatsbyImageData ? 
                    <GatsbyImage image={GatsbyImageData} alt='eyecatch' css={imageCss}/>
                    :
                    <StaticImage src='../../../static/noimg.png' alt='eyecatch' css={imageCss}/>
                }
                {/* <img src={imageURL} css={{width: "100%", height: "100%", objectFit: "cover"}} /> */}
            </div>
        </div>
    )
}