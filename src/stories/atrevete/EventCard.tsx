import { css } from '@emotion/react';
import React from 'react';
import { GatsbyImage,  IGatsbyImageData } from 'gatsby-plugin-image';

interface EventCardProps {
  
  isActive?: boolean;
  title: string;
  date?: string,
  image?: IGatsbyImageData
}

/**
 * Primary UI component for user interaction
 */
export const EventCard = ({
  isActive = false,
  title,
  date = '2020/10/10',
  ...props
}: EventCardProps) => {
  const status = isActive ? '募集中' : '募集終了';
  return (
    <div css={css`
        width: 395px;
        height: 207px;
        border-radius: 5px;
        overflow: hidden;
        background-color: red;
        position: relative;
    `}>
        <GatsbyImage alt='' image={undefined}/>
        <div css={css`
            background-color: blue;
            position: absolute;
            top: 0;
            left: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 5px 20px;
            border-bottom-right-radius: 5px;
        `}>
            <span>{status}</span>
        </div>
        <p>開催日 <span>{date}</span></p>
        <p>{title}</p>
    </div>
  );
};
