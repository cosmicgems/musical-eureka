

const getAllCollectionsPathsQuery = `
  query getAllProductsPaths($first: Int = 250) {
    collections(first: $first) {
      edges {
        node {
          id
          handle
        }
      }
    }
  }
`

export default getAllCollectionsPathsQuery