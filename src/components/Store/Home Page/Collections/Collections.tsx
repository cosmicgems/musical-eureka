import React from 'react'
import MarketingMessage from '../MarketingMessage'
import CollectionContainer from './Collection/CollectionContainer'
import { grey } from '@mui/material/colors'

const Collections = ({products, collections}) => {

    const data = {
        title: "Collections",
        message: "Each collection is meticulously curated to get you closer to a lifestyle worth living.",
        titleColor: "gradient-text-home",
        bgColor: grey[900], 
        textColor: grey[50]
    }

  return (
    <div className='flex flex-col sm:flex-row sm:py-6'>

        <div className=' sm:max-w-1/4 flex justify-center items-center'>
            <MarketingMessage data={data} />
        </div>

        
        
        <CollectionContainer products={products} collections={collections}  />

    </div>
  )
}

export default Collections