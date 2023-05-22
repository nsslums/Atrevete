import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React from 'react';

interface TextAreaProps {
  label?: string,
  name: string,
  id: string,
  required?: boolean,
}

const rootCss = css({
  position: "relative",
  fontSize: 16
})

const labelBase = css({
  position: "absolute",
  top: 35,
  left: 5,
  transition: "0.4s cubic-bezier(0,.5,.5,1)",
  fontSize: "1em",
})

const textAreaCss = css({
    width: 700,
    height: 350,
    borderBottom: "1px white solid",
    padding: "7px 10px",
    marginTop: 30,
    backgroundColor: "#202020",
    borderRadius: "5px 5px 0 0"
})

const label_up = css({
  top: 5,
  left: 5,
  fontSize: ".85em",
})


export const TextArea = ({
    label,
    name,
    id,
    required = false,
    ...props
}: TextAreaProps) => {
  const [value, setValue] = React.useState("")
  const [isSelect, setIsSelect] = React.useState(false)

  const changeHandle = (e: any) =>{
    setValue(e.target.value)
  }

  const onSelectHandel = (e: any)=>{
    setIsSelect(true)
  }
  
  const onBlurHandel = (e: any)=>{
    setIsSelect(false)
  }

  const labelStyle =  isSelect || value ? [labelBase, label_up] :labelBase

  return (
    <div css={rootCss}>
        {label ? <label htmlFor={id} css={labelStyle}>{label}</label> : false}
        <textarea name={name} id={id} value={value} required={required} css={textAreaCss} onBlur={onBlurHandel} onSelect={onSelectHandel} onChange={changeHandle}/>
    </div>
  )
}