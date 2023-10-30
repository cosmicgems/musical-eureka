import React from 'react'
import { parseShopifyResponse, shopifyClient } from '../../../../../lib/shopify';

const AllCollectionsPage = ({collections}) => {
  return (
    <div>
        {collections.map((c)=> (
            <p key={c.title}>
                {c.title}
            </p>
        ))}
    </div>
  )
}

export const getServerSideProps = async () => {

    try {
        const collections = await shopifyClient.collection.fetchAll();
        return {
            props: {
                collections: parseShopifyResponse(collections)
            }
        }
    } catch (error) {
        console.error(error);
        return {
            props: {
                collections: []
            }
        }
    }
}


export default AllCollectionsPage