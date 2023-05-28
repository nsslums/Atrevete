import React from 'react';
import { GatsbyImage, IGatsbyImageData, StaticImage } from "gatsby-plugin-image"
import {FaBullhorn} from "@react-icons/all-files/fa/FaBullhorn"
import { css } from '@emotion/react';

interface PostHeadProps{
    title?: string,
    date: string,
    imageURL?: string,
    GatsbyImageData?: IGatsbyImageData,
}

const imageCss = css({
    height: "100%",
    width: "100%",
    objectFit: "cover",
})

export const PostHead = ({
    title = "イベント名",
    date,
    imageURL,
    GatsbyImageData,
}: PostHeadProps) =>{
    return(
        <div>
            <p>{date}</p>
            <h1>{title}</h1>
            <div>
                {GatsbyImageData ? 
                    <GatsbyImage image={GatsbyImageData} alt='eyecatch' css={imageCss}/>
                    :
                    <StaticImage src='../../images/noimage.svg' alt='eyecatch' css={imageCss}/>
                }
                <img src={imageURL} css={{width: "100%", height: "100%", objectFit: "cover"}} />
            </div>
        </div>
    )
}