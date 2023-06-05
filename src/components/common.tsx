import React from "react";
import { Header } from "../stories/atrevete/Header";
import { Footer } from "../stories/atrevete/Footer";
import GlobalStyle from "../GlobalStyle";
import { Search } from "../stories/atrevete/Search";
import { graphql, useStaticQuery } from "gatsby";
import { css } from "@emotion/react";


const warpper = css({
    display: "flex",
    flexFlow: "column",
    minHeight: "100vh",
})

export const Common = ({ children }: any) => {

    const data = useStaticQuery(graphql`
        query {
            allContentfulPost(filter: {hidden: {ne: true}}) {
                nodes {
                    title
                    content {
                        raw
                    }
                }
            }
            allContentfulEvent(filter: {hidden: {ne: true}}) {
                nodes {
                    title
                    date
                    end_reception
                    start_reception
                    requirements {
                        raw
                    }
                    overview {
                        raw
                    }
                }
            }
        }
    `)

    return (
        <div css={warpper}>
            <GlobalStyle />
            <Header />
            <div css={{marginTop: 98, flexGrow: 1}}>
                {children}
            </div>
            <Search data={data}/>
            <Footer />
        </div>
    )
}