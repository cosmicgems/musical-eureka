import React from 'react'
import Link from 'next/link'
import { urlFor } from '../../../../lib/client'

const Product = ({product: {image, name, slug, price}}) => {
    console.log(slug.current);
  return (
    <div style={{margin: '2vh'}}>
      <Link href={`/technology/shop/product/${slug.current}`}>
        <div className='product-card' style={{maxWidth: '250px'}}>
          <div >
            <img src={urlFor(image && image[0])} style={{objectFit: 'cover', height: '250px', width: '250px'}}  className='product-image p-0' />
          </div>

          <p className='product-name' > 
            {name}
          </p>
          <p className='product-price'>
            ${price}
          </p>
        </div>
      </Link>
    </div>
  )
}

export default Product