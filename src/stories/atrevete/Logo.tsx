import { css } from '@emotion/react';
import { motion } from 'framer-motion';
import { Link } from 'gatsby-link';
import logo from '../../../static/Atrevete.svg';
import { StaticImage } from 'gatsby-plugin-image';

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
      <Link to='/' aria-label='go to top-page'><StaticImage css={{width: `${width}`}} src= '../../../static/Atrevete.png' alt='logo'/></Link>
      :
      <StaticImage css={{width: `${width}`}} src= '../../../static/Atrevete.png'  alt='logo'/>
      }
    </div>
  )
}

export default Logo;