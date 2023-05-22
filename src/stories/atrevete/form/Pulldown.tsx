import { css } from '@emotion/react';
import React from 'react';
import Select from 'react-select';
import './Pulldown.css'

interface PulldownProps {
  label?: string,
  options?: any;
  name: string,
  id: string,
  required?: boolean,
  default_val?:any,
}

const rootCss = css({
  position: "relative",
  fontSize: 16
})

const labelBase = css({
  position: "absolute",
  top: 36,
  left: 10,
  transition: "0.4s cubic-bezier(0,.5,.5,1)",
  fontSize: "1em",
  zIndex: 10,
})

const label_up = css({
  top: 5,
  left: 5,
  fontSize: ".85em",
})

const pullDownCss = css({
  width: 700,
  marginTop: 30,
  backgroundColor: "#202020",
  borderRadius: "5px 5px 0 0",
  display: "inline-block",
  boxSizing: "border-box",
})

export const Pulldown = ({
    label,
    options = [{ value: 'value1', label: '値1'},{ value: 'value2', label: '値2'},],
    name,
    id,
    required = false,
    default_val,
}: PulldownProps) => {
  const [isSelect, setIsSelect] = React.useState(false)
  const [value, setValue] = React.useState(default_val)

  const onBlurHandle = (e: any) =>{
    setIsSelect(false)
  }

  const menuOpenHandle = () =>{
    setIsSelect(true)
  }

  const changeHandole = (e: any) =>{
    setValue(e)
  }

  const labelStyle =  isSelect || value ? [labelBase, label_up] :labelBase

  return (
    <div css={rootCss}>
      {label ? <label htmlFor={id} css={labelStyle}>{label}</label> : false}
      <Select options={options} name={name} id={id} required={required} defaultValue={default_val} css={pullDownCss} classNamePrefix="react-select" placeholder='' components={{IndicatorSeparator: () => null,}}
        onBlur={onBlurHandle} onMenuOpen={menuOpenHandle} onChange={changeHandole}
      />
    </div>
  )
}