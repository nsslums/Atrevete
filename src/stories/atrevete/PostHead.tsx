import React from 'react';
import { GatsbyImage, IGatsbyImageData, StaticImage } from "gatsby-plugin-image"
import { css } from '@emotion/react';

interface PostHeadProps{
    title?: string,
    date: string,
    imageURL?: string,
    GatsbyImageData?: IGatsbyImageData,
    tags: any
}

const eyeCatch = css({
    height: 350,           
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
            <p>
                {date}
                {tags ? 
                <div>
                {tags.map(tag => (
                    <span key={tag.contentful_id}>{tag.name}</span>
                ))}   
                </div>
                 : false}
            </p>
            <h1>{title}</h1>
            <div css={eyeCatch}>
                {GatsbyImageData ? 
                    <GatsbyImage image={GatsbyImageData} alt='eyecatch' css={imageCss}/>
                    :
                    <StaticImage src='../../images/noimage.png' alt='eyecatch' css={imageCss}/>
                }
                {/* <img src={imageURL} css={{width: "100%", height: "100%", objectFit: "cover"}} /> */}
            </div>
        </div>
    )
}