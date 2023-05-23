import React from 'react';
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image"
import { Head1 } from "../Head1"
import { EventStatus } from './EventStatus';
import {FaBullhorn} from "@react-icons/all-files/fa/FaBullhorn"

interface EventHeadProps{
    title?: string,
    date: string,
    imageURL?: string,
    GatsbyImageData?: IGatsbyImageData,
    HeadHeight?: Number,
    isActive?: boolean,
}

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
            }}>
                <div css={{width: "50%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
                    <Head1 text={title}/>
                    <div css={{display: "flex", flexDirection: "row", alignItems: "center", marginTop: 5}}>
                        <EventStatus isActive={isActive} />
                        <p css={{marginLeft: 10}}>開催日 {date ? <span>{date}</span> : <span>未定</span>}</p>
                    </div>
                </div>
                <div css={{width: "50%", borderRadius: "5px", overflow: "hidden"}}>
                    <img src={imageURL} css={{width: "100%", height: "100%", objectFit: "cover"}} />
                    <GatsbyImage image={GatsbyImageData} alt=""/> 
                </div>
            </div>

            {!isActive ? 
                <div css={{
                    marginTop: (HeadHeight/3),
                }}>
                    <div css={{
                        width: "80%",
                        maxWidth: "778px",
                        height: "88px",
                        borderRadius: "10px",
                        margin: "auto",
                        display: "flex",
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: "#6B624C",
                    }}>
                        <div css={{
                            width: "35px",
                            height: "35px",
                            borderRadius: '90px',
                            backgroundColor: "#C5B286",
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginRight: "15px"
                        }}>
                            <FaBullhorn css={{width: "15px", height: "15px"}}/>
                        </div>
                        <p>本イベントの募集は終了しました。たくさんのご応募、ありがとうございました。</p>
                    </div>
                </div>
            : false}
        </div>
    )
}