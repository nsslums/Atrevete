import type { GatsbyConfig } from "gatsby";
require('dotenv').config();

const config: GatsbyConfig = {
  siteMetadata: {
    title: `Atrevete`,
    description: '',
    siteUrl: process.env.SITEURL,
    social: {
      twitter: "",
    }
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: [{
    resolve: 'gatsby-source-contentful',
    options: {
      "accessToken": process.env.ACCESSTOKEN,
      "spaceId": process.env.SPACEID,
      enableTags: true,
    }
  }, "gatsby-plugin-image", "gatsby-plugin-sharp", "gatsby-transformer-sharp", "gatsby-plugin-emotion", {
    resolve: 'gatsby-plugin-sitemap',
    options: {
      query: `
      {
        site {
          siteMetadata {
            siteUrl
          }
        }
        allSitePage {
          nodes {
            path
          }
        }
        allContentfulPost {
          nodes {
            title
            updatedAt(formatString: "YYYY-MM-DDTHH:mm:ssZ")
          }
        }
        allContentfulEvent {
          nodes {
            title
            updatedAt(formatString: "YYYY-MM-DDTHH:mm:ssZ")
          }
        }
      }
    `,
      resolveSiteUrl: ({site: { siteMetadata: {siteUrl} }}) => siteUrl,
      resolvePages: ({
        allSitePage: { nodes: allPages },
        allContentfulPost: { nodes: posts },
        allContentfulEvent: { nodes: events },
      }) => {
        let postMap = posts.reduce((acc, post) => {
          const { title, updatedAt } = post
          acc[`/post/${title}/`] = {updatedAt}

          return acc
        }, {})

        const allMap = events.reduce((acc, post) => {
          const { title, updatedAt } = post
          acc[`/event/${title}/`] = {updatedAt}

          return acc
        }, postMap)

        return allPages.map(page => {
          return { ...page, ...allMap[page.path] }
        })
      },
      excludes: ['/404?(.*)', '/**/privacy', '/event', '/post', '/eventForm', '/contact', '/thanks'],
      serialize: ({ path, updatedAt }) =>  {
        const site = {
          url: path,
          changefreq: `daily`,
          priority: updatedAt ? 0.7 : 0.5,
        }
        if (!updatedAt) return site

        return {
          url: path,
          lastmod: updatedAt,
        }
      },
    },
  }, 'gatsby-plugin-robots-txt',{
    resolve: `gatsby-plugin-canonical-urls`,
    options: {
      siteUrl: process.env.SITEURL,
    },
  },
  {
    resolve: `gatsby-plugin-google-gtag`,
    options: {
      trackingIds: [process.env.GOOGLE_ANALYTICS], 
      pluginConfig: {
        head: true,  // headタグに記載されるように
      }
    }
  },
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      name: `markdown`,
      path: `${__dirname}/src/markdown`,
    },
  },
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      name: 'images',
      path: `${__dirname}/static`,
    },
  },
  `gatsby-transformer-remark`,
  `gatsby-plugin-netlify`,
]
};

export default config;