import { css } from '@emotion/react';
import React from 'react';

interface inputProps {
  label?: string,
  type: string,
  name: string,
  id: string,
  required?: boolean,
  disabled?: boolean,
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
const InputCss = ({
  width: 700,
  height: 30,
  borderBottom: "1px white solid",
  padding: "7px 10px",
  marginTop: 30,
  backgroundColor: "#202020",
  borderRadius: "5px 5px 0 0"
})


const label_up = css({
  top: 5,
  left: 5,
  fonrSize: "0.8em",
})

export const Input = ({
    label,
    type,
    name,
    id,
    required = false,
    disabled = false,
}: inputProps) => {
  const [value, setValue] = React.useState("")
  const [isSelect, setIsSelect] = React.useState(false)

  const changeHandle = (e: any) =>{
    setValue(e.target.value)
  }

  const onSelectHandel = (e: any) =>{
    setIsSelect(true)
  }

  const onBlurHandel = (e: any) =>{
    setIsSelect(false)
  }

  const labelStyle = isSelect || value ? [labelBase, label_up] :labelBase

  return (
    <div css={rootCss}>
      {label ? <label htmlFor={id} css={labelStyle}>{label}</label> : false}
      {type == 'submit' ? 
        <input type="submit" disabled={disabled}/>
        :  
        <input type={type} name={name} id={id} value={value} required={required} css={InputCss} onBlur={onBlurHandel} onSelect={onSelectHandel} onChange={changeHandle} autoComplete="off"/>
      }
    </div>
  )
}