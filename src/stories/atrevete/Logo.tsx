import { css } from '@emotion/react';
import { motion } from 'framer-motion';
import { Link } from 'gatsby-link';
import logo from '../../../static/Atrevete.svg';

interface LogoProps {
  isHome?: boolean;
  width?: string;
}

export const Logo = ({
  isHome = false,
  width = '200px',
  ...props
}: LogoProps) => {
  return (
    <div>
      {isHome ?
      <Link to='/'><img css={{width: `${width}`}} src={logo}/></Link>
      :
      <img css={{width: `${width}`}} src={logo}/>
      }
    </div>
  )
}