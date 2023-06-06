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
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={url} />
            <meta property="og:type" content={type} />
            <meta property="og:site_name" content={data.site.siteMetadata.title} />
            <meta property="og:image" content={data.site.siteMetadata.siteUrl + '/Atrevete.svg'} />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:creator" content={data.site.siteMetadata.social?.twitter || ``} />
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='' />
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet"></link>
            {children}
        </>
    )
}