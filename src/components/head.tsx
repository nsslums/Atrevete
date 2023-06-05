import { graphql, useStaticQuery } from "gatsby"
import React from "react"

interface HeadProps{
    title?: string,
    description?: string,
    meta?: any,
    type: 'website' | 'blog' | 'article',
    url: string,
}

const Head = ({
    title,
    description,
    meta,
    type,
    url,
}:HeadProps) => {
    const data = useStaticQuery(graphql`
        query {
            site {
                siteMetadata {
                    title
                    description
                }
            }
        }
    `)

    title = title ? title : data.site.siteMetadata.title
    description = description ? description : data.site.siteMetadata.description
    return(
        <>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={url} />
            <meta property="og:type" content={type} />
            <meta property="og:site_name" content={data.site.siteMetadata.title} />
        </>
    )
}