import { css } from '@emotion/react';
import React from 'react';
import { Logo } from './Logo';

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
            background: 'black',
            borderTop: 'solid 0.5px rgb(50,50,50)',
        }}>
            <div css={{
                width: "95%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "start",
                // height: 98,
                margin: "auto",
            }}>
                <div css={{margin: '20px'}}>
                    <Logo isHome={true} width={150}/>
                </div>
            </div>
            <div>
                
            </div>
            <div css={{
                textAlign: 'center',
                paddingBottom: '0.7em',
                fontFamily: 'sans-serif',
                color: 'rgb(100,100,100)',
            }}>
            <small css={{
                fontSize: '0.7em',
                }}>Copyright &copy; {year} Atrevete. All rights reserved.</small>
            </div>
        </footer>
    )
}

export default Footer; 