import { css } from '@emotion/react';
import React from 'react';
import Select from 'react-select';

interface PulldownProps {
  label?: string,
  options?: any;
  name: string,
  id: string,
  required?: boolean,
  default_val?:any,
}

const Style = css({

})

export const Pulldown = ({
    label,
    options = [{ value: 'value1', label: '値1'}],
    name,
    id,
    required = false,
    default_val,
}: PulldownProps) => {
  return (
    <div>
      {label ? <label htmlFor={id}>{label}</label> : false}
      <Select options={options} name={name} id={id} required={required} defaultValue={default_val} css={Style}/>
    </div>
  )
}