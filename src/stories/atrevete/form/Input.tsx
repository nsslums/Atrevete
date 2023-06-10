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
    fontSize: 16,
    marginTop: '1.5em',
})


const labelBase = css({
  position: "absolute",
  top: 35,
  left: 15,
  transition: "0.4s cubic-bezier(0,.5,.5,1)",
  fontSize: "1em",
  zIndex: 10
})
const InputCss = ({
  width: '100%',
  height: 40,
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
  fonrSize: "0.8em",
})


const submitCss = css({
  position: 'relative',
  padding: '15px 50px',
  minWidth: 200,
  minHeight: 50,
  fontSize: 20,
  color: 'black',
  background: 'white',
  backgroundImage: 'none',
  outline: 'none',
  borderRadius: '3px',
  overflow: 'hidden',
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


  const labelreq = required ? [labelBase, css({
    "&:after": {
      content: '"*"',
      marginLeft: ".2em"
    }
  })] : labelBase
  const labelStyle = isSelect || value ? [labelreq, label_up] :labelreq
  const InputStyle = isSelect || value ? InputCss : [InputCss, css({
    "&::-webkit-datetime-edit-fields-wrapper":{
      display: "none"
    }
  })]

  const submitStyle = disabled ? [submitCss, css({backgroundColor: "gray"})] : submitCss

  return (
    <div css={rootCss}>
      {label ? <label htmlFor={id} css={labelStyle}>{label}</label> : false}
      {type == 'submit' ? 
        <input type="submit" disabled={disabled} css={submitStyle}/>
        :  
        <input type={type} name={name} id={id} value={value} required={required} css={InputStyle} onBlur={onBlurHandel} onSelect={onSelectHandel} onChange={changeHandle} autoComplete="off"/>
      }
    </div>
  )
}