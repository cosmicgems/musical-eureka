import { Box, Typography } from '@mui/material'
import React from 'react'
import Collection from './Collection'
import { useRouter } from 'next/router'

const CollectionContainer = ({products, collections}) => {
    const router = useRouter();
    const goToCollectionPage = productHandle => router.push(`/store/products/categories/category/${productHandle}`)
  return (
    <div className='sm:w-[75%] min-h-[25vh]'>
        <Box sx={{}}  className="flex gap-12  h-full rounded   py-6  overflow-x-scroll">
            {products && products.length > 0 ?
            <>
            {collections.map((collection) => {
                if(collection.handle === "frontpage"){
                    return
                }
                return (
                    <div key={collection.handle} className='w-screen sm:w-content'>
                        <Collection
                        collection={collection}
                        goToCollectionPage={goToCollectionPage} />                    
                    </div>                    
                )
            })}
            </>
            :
            <div className='flex justify-center items-center'>
                <Typography variant='h4' className='gradient-text-home' component="div">
                    There are&apos;t any collections currently.
                </Typography>
            </div>
            }
        </Box>

    </div>
  )
}

export default CollectionContainer