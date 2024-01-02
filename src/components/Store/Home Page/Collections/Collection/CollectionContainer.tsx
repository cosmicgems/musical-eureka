import { Box, Typography } from '@mui/material'
import React, { useRef } from 'react'
import Collection from './Collection'
import { useRouter } from 'next/router'
import { ScrollableContainer } from '@components/Store/UI'

const CollectionContainer = ({products, collections,}) => {
    const router = useRouter();
    const goToCollectionPage = (path: string) => router.push(`${path}`)
    const ref = useRef<HTMLDivElement>(null);

    const handleHeroNav = (direction) => {
        if (ref.current) {
            if (direction === 'left') {
                ref.current.scrollLeft -= 400;
            }
            if (direction === 'right') {
                ref.current.scrollLeft += 400;
            }
        }
    };
    return (
        <ScrollableContainer data={collections} handleHeroNav={handleHeroNav} heroRef={ref} type={`collections`} >
            
            {collections.map((collection) => {
                console.log(collection.handle);
                
                if(collection.name === "Home page" ){
                    return
                }
                return (
                    <Collection
                    key={collection.handle}
                    collection={collection}
                    goToCollectionPage={goToCollectionPage} />     
                )
            })}
            
        </ScrollableContainer>
  )
}

export default CollectionContainer