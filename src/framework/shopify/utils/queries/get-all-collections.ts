


const getAllCollectionsQuery = `
    query getAllCollectionsQuery($first: Int = 250) {
        collections(first: $first) {
            pageInfo {
                hasNextPage
                hasPreviousPage
            }
            edges {
                node {
                id
                title
                handle
                image {
                    id
                    src
                    originalSrc
                    altText
                    height

                }
                description
                updatedAt
                

                }
            }
        }
    }
`

export default getAllCollectionsQuery