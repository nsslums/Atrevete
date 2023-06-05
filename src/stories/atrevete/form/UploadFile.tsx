import { css } from '@emotion/react';
import React from 'react';

interface UploadFileProps {
  required?: boolean,
}

const Style = css({
  display: 'flex',
  alignItems: 'center',
  paddingBottom: '10px',
  marginTop: '1.5em',
  borderBottom: 'solid 1px white',
})

const btnStyle = css({
  marginRight: '10px',
  padding: '7px 10px',
  width: 'fit-content',
  border: 'solid 1px white',
  borderRadius: '3px',
  '&:hover': {
    color: '#121212',
    background: 'white',
  },
})


export const UploadFile = ({
    required = false,
}: UploadFileProps) => {
    const [file, setFile] = React.useState<File | null>(null)
    const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (files && files[0]) {
          setFile(files[0])
        }
    }
  return (

    <div>
      <label css={Style}>
        <div css={btnStyle}>ファイルを選択</div>
        <input
            css={{display:'none'}}
            type="file"
            name="file"
            id='file'
            accept="image/png, image/jpeg"
            onChange={onChangeFile}
        />
      <p css={{width:'fit-content'}}>ここに選択したファイル名を表示したい...</p>
      </label>
    </div>
  )
}