import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React from 'react';

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

const Style = css({
  borderBottom: "1px solid white"
})

export const Certifications = ({
  label = "",
  name,
  id,
  initData = []
}: CertificationsProps) => {
  const [value, setValue] = React.useState('')
  const [datas, setDatas] = React.useState(initData)

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

  return (
    <div>
      {label ? <label htmlFor={id}>{label}</label> : false}
      <button onClick={addData}>追加</button>
      <input type='text' id={id} css={Style} value={value} onChange={(e: any) => setValue(e.target.value)} />
      <input hidden name={name} value={JSON.stringify(datas)} readOnly/>
      {datas ? (
        <ul>
          {datas.map((data: any) => (
            <li key={data.id}>
              <p>{data.text}</p>
              <button onClick={(e: any) => deleteHandle(e, data.id)}>del</button>
            </li>
          ))}
        </ul>
      )
        : false}

    </div>
  )
}