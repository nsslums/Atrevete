import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React from 'react';
import { TfiTrash } from "react-icons/tfi"
import { GoPlusSmall } from "@react-icons/all-files/go/GoPlusSmall"

type Certification = {
  readonly id: number;
  text: string;
}

interface CertificationsProps {
  label?: string,
  name: string,
  id: string,
  initData?: any;
}

const rootCss = css({
  position: "relative",
  fontSize: 16,
  width: 700
})

const labelBase = css({
  position: "absolute",
  top: 38,
  left: 15,
  transition: "0.4s cubic-bezier(0,.5,.5,1)",
  fontSize: "1em",
})

const InputCss = css({
    width: "100%",
    height: 40,
    borderBottom: "1px white solid",
    padding: "7px 10px",
    marginTop: 30,
    backgroundColor: "#202020",
    borderRadius: "5px 5px 0 0",
    boxSizing: "border-box",
})

const ButtonCss = css({
  position: 'absolute',
  top: 42,
  right: 10,
})

const label_up = css({
  top: 5,
  left: 5,
  fonrSize: "0.8em",
})

const listItem = css({
  padding: "5px 10px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: 'center',
  height: 45,
  boxSizing: "border-box",
  color: "#CDCDCD",
  position:"relative",
  marginTop: ".5em",
   backgroundColor: "#202020"
})
// [{"id":1684744313989,"text":"第1種普通自動車免許"},{"id":1684744299790,"text":"実用英語技能検定 準1級"}]

export const Certifications = ({
  label = "",
  name,
  id,
  initData = []
}: CertificationsProps) => {
  const [value, setValue] = React.useState('')
  const [datas, setDatas] = React.useState(initData)
  const [isSelect, setIsSelect] = React.useState(false)

  const onSelectHandel = (e: any) =>{
    setIsSelect(true)
  }

  const onBlurHandel = (e: any) =>{
    setIsSelect(false)
  }


  const addData = (e: any) => {
    e.preventDefault()  // デフォルトの動作のキャンセル
    if (!value) return

    const newCertification: Certification = {
      id: new Date().getTime(),
      text: value
    }

    setDatas((datas: any) => [newCertification, ...datas])
    setValue('')
  }

  const deleteHandle = (e:any, id: number) => {
    e.preventDefault()  // デフォルトの動作のキャンセル
    setDatas((datas: any) =>
      datas.filter((data: any) => data.id !== id)
    );
  }

  const labelStyle = isSelect || value ? [labelBase, label_up] :labelBase

  return (
    <div css={rootCss}>
      {label ? <label htmlFor={id} css={labelStyle}>{label}</label> : false}
      <input type='text' id={id} css={InputCss} value={value} onChange={(e: any) => setValue(e.target.value)} onSelect={onSelectHandel} onBlur={onBlurHandel}/>
      <input hidden name={name} value={JSON.stringify(datas)} readOnly/>
      <button onClick={addData} css={ButtonCss}><GoPlusSmall /></button>
      {datas ? (
        <ul>
          {datas.map((data: any) => (
            <li key={data.id} css={listItem}>
              <p>{data.text}</p>
              <button onClick={(e: any) => deleteHandle(e, data.id)}><TfiTrash css={{width: 20, hegith: 20}}/></button>
            </li>
          ))}
        </ul>
      )
        : false}

    </div>
  )
}