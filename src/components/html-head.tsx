import { graphql, useStaticQuery } from "gatsby"
import React, { Children } from "react"

interface HeadProps{
    title?: string,
    description?: string,
    type: 'website' | 'blog' | 'article',
    url: string,
    children?: any,
}

export const Html_Head = ({
    title,
    description,
    type,
    url,
    children,
}:HeadProps) => {
    const data = useStaticQuery(graphql`
        query {
            site {
                siteMetadata {
                    title
                    description
                    siteUrl
                    social{
                        twitter
                    }
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
            <head prefix="og: http://ogp.me/ns#"></head>
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={url} />
            <meta property="og:type" content={type} />
            <meta property="og:site_name" content={data.site.siteMetadata.title} />
            <meta property="og:image" content={data.site.siteMetadata.siteUrl + '/og.png'} />
            <meta property="og:locate" content="ja_JP" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:creator" content={data.site.siteMetadata.social?.twitter || ``} />
            {children}
        </>
    )
}