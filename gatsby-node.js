const path = require(`path`)

const GetSlug = (node) => {
    if (node.slug != null) {
        return node.slug
    } else {
        return node.title
    }
}

exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions
    const PostTemplate = path.resolve(`src/templates/post.tsx`)
    const EventTemplate = path.resolve(`src/templates/event.tsx`)
    const result = await graphql(`
        query {
            allContentfulPost(filter: {hidden: {ne: true}}) {
                nodes {
                    title
                    contentful_id
                    slug
                }
            }
            allContentfulEvent(filter: {hidden: {ne: true}}) {
                nodes {
                    title
                    contentful_id
                    slug
                }
            }
        }
    `)

    result.data.allContentfulPost.nodes.forEach(node => {
      createPage({
            path: `post/${GetSlug(node)}`,
            component: PostTemplate,
            context: {
                contentful_id: node.contentful_id,
            },
        })
    })

    result.data.allContentfulEvent.nodes.forEach(node => {
        createPage({
            path: `event/${GetSlug(node)}`,
            component: EventTemplate,
            context: {
                contentful_id: node.contentful_id,
            },
        })
    })
  }