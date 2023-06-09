import { Suspense, lazy } from "react";
import { Header } from "../stories/atrevete/Header";
import GlobalStyle from "../GlobalStyle";
import { graphql, useStaticQuery } from "gatsby";
import { css } from "@emotion/react";

const Footer = lazy(() => import('../stories/atrevete/Footer'));
const Search = lazy(() => import('../stories/atrevete/Search'));

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
            <Suspense fallback={null}>
                <Search data={data}/>
                <Footer />
            </Suspense>
        </div>
    )
}