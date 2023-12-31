import { Box, Typography } from '@mui/material'
import React, { useRef } from 'react'
import { Layout } from '@components/big-three-components';
import { grey } from '@mui/material/colors'
import { parseShopifyResponse, shopifyClient } from '../../../../../lib/shopify'
import { useRouter } from 'next/router'
import Collection from '../../../../components/Store/Home Page/Collections/Collection/Collection'
import { getConfig } from '@framework/api/config'
import { getAllCollections } from '@framework/product'
import { ScrollableContainer } from '@components/Store/UI'

const AllCollectionsPage = ({collections}) => {  

    const collectionsRef = useRef<HTMLDivElement>(null);

    const handleCollectionsNav = (direction) => {
        
        if (collectionsRef.current) {
            if (direction === 'left') {
                collectionsRef.current.scrollLeft -= 800;
            }
            if (direction === 'right') {
                collectionsRef.current.scrollLeft += 800;
            }
        }
    };
    
    const router = useRouter();
    const goToCollectionPage = path => router.push(`${path}`)
    return (
        <Box>
            <Layout>
    
            <div className='flex flex-col sm:flex-row   mt-6 gap-6 md:mt-20 sm:items-center' >
    
                <div className='sm:hidden px-3'>
                    <Typography variant='h5' className=' gradient-text-home' sx={{}} component="div">
                        Collections. <span style={{color: "#000"}} className='' >Meticulously Curated for a Lifestyle Worth Living.</span>
                    </Typography>
                </div>
    
                <div className='hidden sm:flex  p-3'>
                    <Box className="rounded h-[40vh] w-[17vw] p-3 md:flex md:justify-center md:items-center" sx={{bgcolor:grey[900]}}>
                        <Typography variant='h4' className=' gradient-text' sx={{}} component="div">
                        Collections. <span style={{color: "#EEE"}} className='font-normal' >Meticulously Curated for a Lifestyle Worth Living.</span>
                        </Typography>              
                    </Box>
                </div>
    
                <ScrollableContainer data={collections} ref={collectionsRef} type={`collections`} handleHeroNav={handleCollectionsNav}  >
                    {
                        collections?.map((collection) => {
                            // console.log(collection);
                            
                        if(collection.name === "Home page") return
                        return(
                        <div key={collection.id}>
                            <Collection  goToCollectionPage={goToCollectionPage} collection={collection} />
                        </div>
                        )
                        })
                    }
                </ScrollableContainer>
    
            </div>
    
            </Layout>
        </Box>
    )
}

export const getStaticProps = async () => {

    try {
        const config = getConfig();
        const collections = await getAllCollections(config)

        return {
            props: {
                collections
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