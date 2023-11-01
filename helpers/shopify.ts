
const domain = process.env.SHOPIFY_STORE_DOMAIN
const storefrontAccessToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN

export async function callShopify(query, variables = {}) {
  const fetchUrl = `https://${domain}/api/2023-10/graphql.json`

  const fetchOptions = {
    endpoint: fetchUrl,
    method: "POST",
    headers: {
      "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables }),
  }

  try {
    const data = await fetch(fetchUrl, fetchOptions).then((response) =>
      response.json()
    )
    return data
  } catch (error) {
    console.log(error)
    throw new Error("Could not fetch products!")
  }
}

const gql = String.raw

export const AllProducts = gql`
  query Products {
    products(first: 22) {
      edges {
        node {
          id
          title
          productType
          totalInventory
          handle
          images(first: 10) {
            edges {
              node {
                url
                width
                height
              }
            }
          }
          priceRange {
            maxVariantPrice {
              amount
            }
          }
        }
      }
    }
  }
`;

export const ProductByHandle = `
query AllProducts($handle: String!) {
  productByHandle(handle: $handle) {
    
          id
          title
          totalInventory
          handle
          productType
          description
          images(first: 10) {
            edges {
              node {
                url
                width
                height
              }
            }
          }
          priceRange {
            maxVariantPrice {
              amount
            }
          }
  }
}

`


export const CollectionProducts = `
query AllProducts($category: String!) {
  collection(handle: $category) {
    handle
    products(first: 22) {
      edges {
        node {
          id
          title
          totalInventory
          handle
          images(first: 10) {
            edges {
              node {
                url
                width
                height
              }
            }
          }
          priceRange {
            maxVariantPrice {
              amount
            }
          }
        }
      }
    }
  }
}
`;