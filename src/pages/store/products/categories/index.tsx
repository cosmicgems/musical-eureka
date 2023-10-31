import { Box, Typography } from '@mui/material'
import React from 'react'
import Layout from '../../../../components/Layout'
import { grey } from '@mui/material/colors'
import { parseShopifyResponse, shopifyClient } from '../../../../../lib/shopify'
import { useRouter } from 'next/router'
import Collection from '../../../../components/Store/Home Page/Collections/Collection/Collection'

const CategoryPage = ({collections}) => {
  console.log(collections);
  
  const router = useRouter();
  const goToCollectionPage = productHandle => router.push(`/store/products/categories/${productHandle}`)
  return (
    <Box>
      <Layout>

        <div className='flex flex-col sm:flex-row  sm:min-h-[70vh] mt-6 gap-6' >

          <div className='sm:hidden px-3'>
            <Typography variant='h5' className=' gradient-text-home' sx={{}} component="div">
              Collections. <span style={{color: "#000"}} className='' >Meticulously Curated for a Lifestyle Worth Living.</span>
            </Typography>
          </div>

          <div className='hidden sm:flex  p-3'>
            <Box className="rounded h-[40vh] w-[17vw] p-3" sx={{bgcolor:grey[900]}}>
              <Typography variant='h4' className=' gradient-text' sx={{}} component="div">
                Collections. <span style={{}} className='' >Meticulously Curated for a Lifestyle Worth Living.</span>
              </Typography>              
            </Box>
          </div>

          <div className='w-full overflow-x-auto flex p-3'>
            {
              collections?.map((collection) => {
                if(collection.handle === "frontpage") return
                return(
                <div key={collection.id}>
                  <Collection goToCollectionPage={goToCollectionPage} collection={collection} />
                </div>
                )
              })
            }
          </div>

        </div>

      </Layout>
    </Box>
  )
}

export const getStaticProps = async() => {
  try {
    const collections = await shopifyClient.collection.fetchAll();
    return {
      props: { collections: parseShopifyResponse(collections) }
    }
    
  } catch (error) {
    console.error(error);
    return {
      props: { collections: [] }
    }
    
  }
}

export default CategoryPage