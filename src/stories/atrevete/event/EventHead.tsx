import React from 'react';
import { GatsbyImage, IGatsbyImageData, StaticImage } from "gatsby-plugin-image"
import { Head1 } from "../Head1"
import { EventStatus } from './EventStatus';
import {FaBullhorn} from "@react-icons/all-files/fa/FaBullhorn"
import { css } from '@emotion/react';

interface EventHeadProps{
    title?: string,
    date: string,
    imageURL?: string,
    GatsbyImageData?: IGatsbyImageData,
    HeadHeight?: Number,
    isActive?: boolean,
}

const imageCss = css({
    height: "100%",
    width: "100%",
    objectFit: "cover",
})

export const EventHead = ({
    title = "イベント名",
    date,
    imageURL,
    GatsbyImageData,
    HeadHeight = 200,
    isActive = new Date().getTime() < new Date(date).getTime() || !date,
}: EventHeadProps) =>{
    return(
        <div css={{
            margin: "50px auto",
        }}>
            <div css={{
                position: "relative",
                display: "flex",
                flexDirection: "row",
                height: HeadHeight,
                width: 770,
                justifyContent: "space-between",
            }}>
                <div css={{width: "48%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
                    <Head1 text={title} />
                    <div css={{display: "flex", flexDirection: "row", alignItems: "center", marginTop: 5}}>
                        <EventStatus isActive={isActive} />
                        <p css={{marginLeft: 10}}>開催日 {date ? <span>{date}</span> : <span>未定</span>}</p>
                    </div>
                </div>
                <div css={{width: "50%", borderRadius: "5px", overflow: "hidden"}}>
                    {GatsbyImageData ? 
                        <GatsbyImage image={GatsbyImageData} alt='eyecatch' css={imageCss}/>
                        :
                        <StaticImage src='../../../images/noimage.png' alt='eyecatch' css={imageCss}/>
                    }
                    <img src={imageURL} css={{width: "100%", height: "100%", objectFit: "cover"}} />
                </div>
            </div>

            {!isActive ? 
                <div css={{
                    marginTop: (HeadHeight/3),
                }}>
                    <div css={{
                        width: "80%",
                        maxWidth: 778,
                        height: 88,
                        borderRadius: 10,
                        margin: "auto",
                        display: "flex",
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: "#6B624C",
                        padding: "5px 10px",
                        boxSizing: 'border-box',
                    }}>
                        <div css={{
                            minWidth: 35,
                            minHeight: 35,
                            borderRadius: 90,
                            backgroundColor: "#C5B286",
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginRight: 15,
                        }}>
                            <FaBullhorn css={{width: 15, height: 15}}/>
                        </div>
                        <p>本イベントの募集は終了しました。たくさんのご応募、ありがとうございました。</p>
                    </div>
                </div>
            : false}
        </div>
    )
}