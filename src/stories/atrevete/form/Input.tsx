import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React from 'react';

interface inputProps {
  label?: string,
  type: string,
  name: string,
  id: string,
  required?: boolean,
  disabled?: boolean,
}

const Style = css({
    borderBottom: "1px solid white"
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

  const changeHandle = (e: any) =>{
    setValue(e.target.value)
  }

  return (
    <div>
      {label ? <label htmlFor={id}>{label}</label> : false}
      {type == 'submit' ? 
        <input type="submit" disabled={disabled}/>
      :  
      <input type={type} name={name} id={id} required={required} css={Style} value={value} onChange={changeHandle}/>
    }
    </div>
  )
}