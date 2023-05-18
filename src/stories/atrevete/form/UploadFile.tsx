import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React from 'react';

interface UploadFileProps {
  required?: boolean,
}

const Style = css({
    borderBottom: "1px solid white"
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
        <input
            type="file"
            name="file"
            id='file'
            accept="image/png, image/jpeg"
            onChange={onChangeFile}
        />
    </div>
  )
}