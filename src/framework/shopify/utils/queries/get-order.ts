

const getOrderQuery = `
query getOrderAndFulfillmentOrderWithMetafields ($id : ID!) {
    order(id: $id) {
      fulfillmentOrders(first: 5) {
        nodes {
          id
          status
          order {
            lineItems(first: 10) {
              nodes {
                id
                sku
                variant {
                  id
                  title
                  m_reference: metafield(namespace: "*", key: "*") {
                    value
                    type
                    ownerType
                  }
                  m_color_code: metafield(namespace: "*", key: "*") {
                    value
                    type
                    ownerType
                  }
                  product {
                    id
                    m_reference: metafield(namespace: "*", key: "*") {
                      value
                      type
                      ownerType
                    }
                  }
                }
              }
            }
          }
          lineItems(first: 10) {
            nodes {
              id
              sku
              variantTitle
              productTitle
            }
          }

          
        }
      }
    }
   }
`;

export default getOrderQuery;