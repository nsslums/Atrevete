import { css } from '@emotion/react';


interface SimpleButtomProps {
  text?: string;
  onClick?: () => void;
}

const Style = css({
  position: 'relative',
  padding: '15px 50px',
  minWidth: '250px',
  minHeight: '70',
  fontSize: '32px',
  color: 'black',
  background: 'white',
  backgroundImage: 'none',
  outline: 'none',
  borderRadius: '3px',
  overflow: 'hidden',
  transition: 'ease .2s',
  '&:hover': {
    backgroundRepeat: 'none',
    boxShadow: '0 0 20px 0 black',
    border: 'none',
    transform: 'scale(1.05)',
    backgroundColor: "#efefef"
  }
})


export const SimpleButton = ({
  text = 'Button',
  ...props 
}: SimpleButtomProps) => {
  return (
    <button type='button' css={Style} {...props}>{text}</button>
  )
}