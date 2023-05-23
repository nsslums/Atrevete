import React from "react";
import { Header } from "../stories/atrevete/Header";
import { Footer } from "../stories/atrevete/Footer";
import GlobalStyle from "../GlobalStyle";
import { Search } from "../stories/atrevete/Search";
import { graphql, useStaticQuery } from "gatsby";

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
        <>
            <GlobalStyle />
            <Header />
            {children}
            <Search data={data}/>
            <Footer />
        </>
    )
}

// query MyQuery {
//     allContentfulPost(filter: {hidden: {ne: true}}) {
//       nodes {
//         title
//         content {
//           raw
//         }
//       }
//     }
//     allContentfulEvent(filter: {hidden: {ne: true}}) {
//       nodes {
//         title
//         date
//         end_reception
//         start_reception
//         requirements {
//           raw
//         }
//         overview {
//           raw
//         }
//       }
//     }
//   }