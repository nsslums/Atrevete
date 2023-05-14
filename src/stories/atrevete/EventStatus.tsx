import React from 'react';

interface EventStatusProps{
    isActive: boolean,
    fontSize?: number,
}

export const EventStatus = ({
    isActive,
    fontSize = 18
}: EventStatusProps) =>{
    const text = isActive ? "募集中" : "募集終了"
    const bgColor = isActive ? "#906D3B" : "#666666"
    return(
        <div css={{
            backgroundColor: bgColor,
            padding: "5px 15px",
            display: 'inline-block',
            fontSize: fontSize,
        }}>
            <p>{text}</p>
        </div>
    )
}