import { css } from '@emotion/react';
import React from 'react';
import { GatsbyImage,  IGatsbyImageData } from 'gatsby-plugin-image';

interface ButtonProps {
  text: string;
}

export const GoldButton = ({
  text = 'Button',
  ...props 
}: ButtonProps) => {
  return (
    <button>button</button>

    )
};