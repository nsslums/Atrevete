import type { GatsbyConfig } from "gatsby";
require('dotenv').config();

const config: GatsbyConfig = {
  siteMetadata: {
    title: `Atrevete`,
    siteUrl: `https://www.yourdomain.tld`
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: [{
    resolve: 'gatsby-source-contentful',
    options: {
      "accessToken": process.env.DEBUG_ACCESSTOKEN,
      "spaceId": process.env.DEBUG_SPACEID,
      enableTags: true,
    }
  }, "gatsby-plugin-image", "gatsby-plugin-sharp", "gatsby-transformer-sharp", "gatsby-plugin-emotion"]
};

export default config;
