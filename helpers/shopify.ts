
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
    products(first:24) {
      edges {
        cursor
        node {
          id
          title
          productType
          totalInventory
          description
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

export const NextProducts = gql`
  query getProducts ($first: Int!, $after: String){
    products(first: $first, after: $after) {
      edges {
        cursor
        node {
          id
          title
          productType
          totalInventory
          description
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
      pageInfo {
        hasNextPage
        endCursor
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
    products(first: 24) {
      edges {
        cursor
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

export const CollectionLoadMoreProducts = `
query AllProducts($category: String!, $first: Int!, $after:String) {
  collection(handle: $category) {
    handle
    products(first: $first, after: $after) {
      edges {
        cursor
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
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
}
`;

export const CreateCart = `mutation($cartInput: CartInput) {
  cartCreate(input: $cartInput)(
    input: {
      lines: [
        {
          quantity: 1
          merchandiseId: "gid://shopify/ProductVariant/1"
        }
      ],
      # The information about the buyer that's interacting with the cart.
      buyerIdentity: {
        email: $buyerEmail,
        countryCode: $countryCode,
        # An ordered set of delivery addresses associated with the buyer that's interacting with the cart. The rank of the preferences is determined by the order of the addresses in the array. You can use preferences to populate relevant fields in the checkout flow.
        deliveryAddressPreferences: $addressPreferences
      }
      attributes: {
        key: "cart_attribute",
        value: "This is a cart attribute"
      }
    }
  ) {
    cart {
      id
      checkoutUrl
      totalQuantity
      createdAt
      updatedAt
      lines(first: 10) {
        edges {
          node {
            id
            merchandise {
              ... on ProductVariant {
                id
                merchandise
                cost
                discountAllocations
                quantity
                sellingPlanAllocation

              }
            }
          }
        }
      }
      buyerIdentity {
        deliveryAddressPreferences {
          __typename
        }
      }
      attributes {
        key
        value
      }
      # The estimated total cost of all merchandise that the customer will pay at checkout.
      cost {
        totalAmount {
          amount
          currencyCode
        }
        # The estimated amount, before taxes and discounts, for the customer to pay at checkout.
        subtotalAmount {
          amount
          currencyCode
        }
        # The estimated tax amount for the customer to pay at checkout.
        totalTaxAmount {
          amount
          currencyCode
        }
      }
    }
  }
}
`;