import { Suspense, lazy } from "react";
import { Header } from "../stories/atrevete/Header";
import GlobalStyle from "../GlobalStyle";
import { graphql, useStaticQuery } from "gatsby";
import { css } from "@emotion/react";
import { motion, AnimatePresence} from "framer-motion";

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
                    slug
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
                    slug
                }
            }
        }
    `)

    return (
        <div css={warpper}>
            <GlobalStyle />
            <Header />
            <AnimatePresence mode="wait">
                <motion.div
                    key={location.pathname}
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    exit={{opacity: 0}}
                    transition={{duration: 1}}
                    css={{marginTop: 98, flexGrow: 1}}>
                    {children}
                </motion.div>
            </AnimatePresence>
            <Suspense fallback={null}>
                <Search data={data}/>
                <Footer />
            </Suspense>
        </div>
    )
}