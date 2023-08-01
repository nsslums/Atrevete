import React from 'react';
import { GatsbyImage, IGatsbyImageData, StaticImage } from "gatsby-plugin-image"
import { Head1 } from "../Head1"
import { EventStatus } from './EventStatus';
import {FaBullhorn} from "@react-icons/all-files/fa/FaBullhorn"
import { css } from '@emotion/react';
import facepaint from 'facepaint';

const breakpoints = [520, 767, 1100];
const mq = facepaint(breakpoints.map(bp => `@media (min-width: ${bp}px)`))

interface EventHeadProps{
    title?: string,
    date: string,
    imageURL?: string,
    GatsbyImageData?: IGatsbyImageData,
    HeadHeight?: Number,
    isActive?: boolean,
}

const imageCss = css(mq({
    marginLeft: [0,0,0,40],
    height: "100%",
    // width: "100%",
    objectFit: "cover",
    borderRadius: "5px"
}))

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
            width: "100%",
            display: "flex",
            contentAling: "center",
            flexDirection: "column",
            // border: "solid 1px white",
        }}>
            <div css={mq({
                position: "relative",
                display: "flex",
                flexDirection: ["column","column","column","row"],
                // height: HeadHeight,
                alignItems: "center",
                width: "100%",
                // border: "solid 1px white",
                justifyContent: "space-between",
                
            })}>
                <div css={{minWidth: "48%", width: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
                    <Head1 text={title} />
                    <div css={{display: "flex", flexDirection: "row", alignItems: "center", marginTop: 5}}>
                        <EventStatus isActive={isActive} />
                        <p css={{marginLeft: 10}}>開催日 {date ? <span>{date}</span> : <span>未定</span>}</p>
                    </div>
                </div>
                <div css={mq({minWidth: "50%", maxWidth: " 500px", marginTop: [30,30,30,0], overflow: "hidden"})}>
                    {GatsbyImageData ? 
                        <GatsbyImage image={GatsbyImageData} alt='eyecatch' css={imageCss}/>
                        :
                        <StaticImage src='../../../../static/noimg.png' alt='eyecatch' css={imageCss}/>
                    }
                    
                </div>
            </div>

            {!isActive ? 
                <div css={{
                    marginTop: (HeadHeight/3),
                }}>
                    <div css={{
                        width: "100%",
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