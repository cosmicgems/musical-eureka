

const getCollectionProductsQuery = `
    query getCollectionQuery ($handle: String!) {
        collection(handle: $handle) {
            title
            handle
            id
            image {
                id
                src
                originalSrc
                altText
                height
            }
            description
            products (first: 250) {
                pageInfo {
                    hasNextPage
                    hasPreviousPage
                }
                edges {
                    node {
                        id
                        title
                        vendor
                        handle
                        description
                        priceRange {
                            minVariantPrice {
                                amount
                                currencyCode
                            }
                        }
                        images(first: 2) {
                            pageInfo {
                                hasNextPage
                                hasPreviousPage
                            }
                            edges {
                                node {
                                    originalSrc
                                    altText
                                    width
                                    height
                                }
                            }
                        }
                    }
                }
            }
        }
    } 
`

export default getCollectionProductsQuery