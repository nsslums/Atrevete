import { css } from '@emotion/react';
import React from 'react';
import { Head3 } from '../Head2';
import { GoldButton } from '../GoldButton';
import { Transform } from 'stream';

interface EventFormCardProps {
  isActive?: boolean;
  start_date?: Date,
  end_date?: Date,
}

const base = css({
    position: "relative",
    display: "flex",
    flexDirection: "row",
    justifyContent: 'space-around',
    alignItems: 'center',
    width: "777px",
    height: "150px",
    borderRadius: "15px",
    overflow: "hidden",

    border: "1px dashed white",

})

const disable = css({
    "&::before":{
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,.6)",
        zIndex: 10
    },

    "&::after":{
        content: '"受付は終了しました"',
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)", 
        zIndex: 10,
        fontSize: 20,
    }    
})

export const EventFormCard = ({
  isActive = false,
  start_date = new Date(),
  end_date = new Date(),
  ...props
}: EventFormCardProps) => {

    const style = isActive ? base : [base, disable]
  return (
    <>
        <div css={style}>
            <div css={{
                widht: "50%",
                display: "flex",
                flexDirection: "column",
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Head3 text='応募期間' />
                <p css={{marginTop: "10px"}}>{start_date.getFullYear()}年{start_date.getMonth()+1}月{start_date.getDate()}日 ~ {end_date.getFullYear()}年{end_date.getMonth()+1}月{end_date.getDate()}日</p>
            </div>
            <div css={{
                widht: "50%",
            }}>
                <GoldButton text='応募はこちら' />
            </div>
        </div>
    </>
  );
};
