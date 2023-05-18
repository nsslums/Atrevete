import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React from 'react';

interface TextAreaProps {
  label?: string,
  name: string,
  id: string,
  required?: boolean,
}

const Style = css({
    borderBottom: "1px solid white"
})


export const TextArea = ({
    label,
    name,
    id,
    required = false,
    ...props
}: TextAreaProps) => {
  const [value, setValue] = React.useState("")

  const changeHandle = (e: any) =>{
    setValue(e.target.value)
  }
  return (
    <div>
        {label ? <label htmlFor={id}>{label}</label> : false}
        <textarea name={name} id={id} value={value} required={required} css={Style} onChange={changeHandle}/>
    </div>
  )
}