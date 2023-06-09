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
  fontSize: 16,
  marginTop: '1.5em'
})

const labelBase = css({
  position: "absolute",
  top: 40,
  left: 15,
  transition: "0.4s cubic-bezier(0,.5,.5,1)",
  fontSize: "1em",
})

const textAreaCss = css({
    width: '100%',
    height: 350,
    borderBottom: "1px white solid",
    padding: "7px 10px",
    marginTop: 30,
    backgroundColor: "#202020",
    borderRadius: "5px 5px 0 0",
    boxSizing: "border-box",
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


  const labelreq = required ? [labelBase, css({
    "&:after": {
      content: '"*"',
      marginLeft: ".2em"
    }
  })] : labelBase
  const labelStyle =  isSelect || value ? [labelreq, label_up] :labelreq

  return (
    <div css={rootCss}>
        {label ? <label htmlFor={id} css={labelStyle}>{label}</label> : false}
        <textarea name={name} id={id} value={value} required={required} css={textAreaCss} onBlur={onBlurHandel} onSelect={onSelectHandel} onChange={changeHandle}/>
    </div>
  )
}