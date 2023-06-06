import { css } from '@emotion/react';
import React, { useState } from 'react';
import {CgMenuRightAlt} from "@react-icons/all-files/cg/CgMenuRightAlt"
import {RiCloseLine} from "@react-icons/all-files/ri/RiCloseLine"
import { StaticImage } from 'gatsby-plugin-image';
import { Link } from 'gatsby-link';
import { GoldLink } from './GoldLink';

interface HeaderProps {
    menuOpen?: boolean
}

const menu = css({
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100vh",
    backgroundColor: "rgba(0, 0, 0, .7)",
    backdropFilter: 'blur(2px)',
})

const block = css({
    fontSize: 40,
    padding: "5px 0",
    marginRight: "1em"
})

export const Header = ({
    menuOpen = false
}: HeaderProps) =>{

    const [openMenu, setOpenMenu] = React.useState(menuOpen)

    const onClick = () =>{
        setOpenMenu(!openMenu)
    }

    return(
        <header css={{
            width: "100%",
            position: "fixed",
            background: "linear-gradient(rgba(0,0,0,1),rgba(0,0,0,0));",
            top: 0,
            left: 0,
            zIndex: 100,
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
                    <Link to="/" ><img src="/Atrevete.svg" alt='Logo' /></Link>
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
            {openMenu ? <div css={menu}>
                <div css={{
                    display: 'flex',
                    flexDirection: "column",
                    alignItems: 'end',
                }}>
                    <div css={{
                        height: "98px",
                        width: "95%",
                        margin: "auto",
                        display: "flex",
                        justifyContent: "end",
                        alignItems: 'center',
                    }}>
                        <div css={{
                                width: "30px",
                                height: "30px",
                                cursor: "pointer",
                            }} onClick={onClick}>
                                <RiCloseLine css={{
                                width: "30px",
                                height: "30px",
                            }} />
                        </div>
                    </div>
                    <div css={block} onClick={onClick}><GoldLink to='/' text='トップページ'/></div>
                    <div css={block} onClick={onClick}><GoldLink to='/about' text='Atreveteとは' /></div>
                    <div css={block} onClick={onClick}><GoldLink to='/post' text='投稿' /></div>
                    <div css={block} onClick={onClick}><GoldLink to='/contact' text='お問い合わせ' /></div>
                </div>
            </div>
            : false }
        </header>
    )
}