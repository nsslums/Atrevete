const path = require(`path`)

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
                }
            }
            allContentfulEvent(filter: {hidden: {ne: true}}) {
                nodes {
                    title
                    contentful_id
                }
            }
        }
    `)

    result.data.allContentfulPost.nodes.forEach(node => {
      createPage({
            path: `post/${node.title}`,
            component: PostTemplate,
            context: {
                contentful_id: node.contentful_id,
            },
        })
    })

    result.data.allContentfulEvent.nodes.forEach(node => {
        createPage({
            path: `event/${node.title}`,
            component: EventTemplate,
            context: {
                contentful_id: node.contentful_id,
            },
        })
    })
  }