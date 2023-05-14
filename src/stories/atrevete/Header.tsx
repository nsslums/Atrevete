import { css } from '@emotion/react';
import React, { useState } from 'react';
import {CgMenuRightAlt} from "@react-icons/all-files/cg/CgMenuRightAlt"
import { StaticImage } from 'gatsby-plugin-image';

interface HeaderProps {
}

export const Header = ({

}: HeaderProps) =>{

    const [openMenu, setOpenMenu] = React.useState(false)

    const onClick = () =>{
        setOpenMenu(!openMenu)
    }

    return(
        <header css={{
            width: "100%",
            position: "relative",
            top: 0,
            left: 0,
            zIndex: 10,
        }}>
            <div css={{
                height: "98px",
                width: "95%",
                margin: "auto",
                display: "flex",
                justifyContent: 'space-between',
                alignItems: 'center',
            }}>
                <div css={{

                }}>
                    <img src="src/images/Atrevete.svg" alt='Logo' />
                </div>
                <div css={{
                        width: "30px",
                        height: "30px",
                        cursor: "pointer",
                    }} onClick={onClick}>
                    <CgMenuRightAlt css={{
                        width: "30px",
                        height: "30px",
                    }} />
                </div>
            </div>
        </header>
    )
}