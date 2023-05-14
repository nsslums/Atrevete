import React from "react";
import { Header } from "../stories/atrevete/Header";
import { Footer } from "../stories/atrevete/Footer";
import GlobalStyle from "../GlobalStyle";

export const Common = ({children}: any) => {
    return(
        <>
            <GlobalStyle/>
            <Header/>
            {children}
            <Footer/>
        </>
    )
}