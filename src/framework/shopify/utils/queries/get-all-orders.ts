
const getAllOrdersQuery = `
    query {
        orders(first: 250) {
            edges {
                node{
                    id
                }
            }
        }
    }
`

export default getAllOrdersQuery