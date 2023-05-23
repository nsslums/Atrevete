import { css } from '@emotion/react';
import React from 'react';

interface FooterProps {
}

export const Footer = ({
    
}: FooterProps) =>{
    const year = new Date().getUTCFullYear()
    return(
        <footer css={{
            width: "100%",
            position: "relative",
            top: 0,
            left: 0,
        }}>
            <div>
                <img src="/Atrevete.svg" alt='Logo' />
            </div>
            <div css={{
                textAlign: 'center',
            }}>
                <small>Copyright &copy; {year} Atrevete. All rights reserved.</small>
            </div>
        </footer>
    )
}