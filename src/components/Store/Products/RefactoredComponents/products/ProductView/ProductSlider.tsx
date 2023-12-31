import React, { useState } from 'react'
import ArrowLeftRoundedIcon from '@mui/icons-material/ArrowLeftRounded';
import ArrowRightRoundedIcon from '@mui/icons-material/ArrowRightRounded';
import { CardMedia } from '@mui/material';

const ProductSlider = ({product}) => {
  const [photo, setPhoto] = useState<number>(0);

  const handlePhotoArrows = (direction:string) => {
    if(direction === "left") {
      if(photo === 0) return;
      setPhoto(photo - 1);
    }
    else if (direction === "right") {
      if(photo === product.images.length ) return;
      setPhoto(photo + 1);
    }
    
  };

  return (
    <div className='product-image-slider-container'>
      <div className='scroll-container-arrows' onClick={()=> { handlePhotoArrows("left") }}>
        <ArrowLeftRoundedIcon  />
      </div>
      <div className='scrollable-alternate-product-images-container'>
        <div className='alternate-product-image-container'>
          {
            product.images.map((img, index) => (
              <CardMedia 
              key={`${index} - alternate image: ${product.id}`}
              component="img"
              image={img.url}
              alt={product.title}
              sx={{}}
              className='alternate-image'
              />
            ))
          }
        </div>        
      </div>
      
      <div className='scroll-container-arrows' onClick={()=>{ handlePhotoArrows("right") }}>
        <ArrowRightRoundedIcon />
      </div>
    </div>
  )
}

export default ProductSlider