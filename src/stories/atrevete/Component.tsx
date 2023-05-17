import { css } from '@emotion/react';
import { motion } from 'framer-motion';

interface ComponentProps {
  text: string;
}

const Style = css({
})


export const Component = ({
  text,
  ...props
}: ComponentProps) => {
  return (
    <p css={Style} {...props}>{text}</p>
  )
}