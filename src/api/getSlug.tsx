export const GetSlug = (node:any) => {

    if (node.slug != null) {
        return node.slug
    } else {
        return node.title
    }
}