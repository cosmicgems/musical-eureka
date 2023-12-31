import React, { useRef, } from 'react';
import { useRouter } from 'next/router'
import ProductsListContainer from './ProductsListContainer';
import ScrollableContainer from '../UI/ScrollableContainer';



export default function ProductsList({products}) {
  const router = useRouter()
  const heroRef = useRef<HTMLDivElement>(null);
  const handleHeroNav = (direction) => {
    if (heroRef.current) {
      if (direction === 'left') {
        heroRef.current.scrollLeft -= 400;
      }
      if (direction === 'right') {
        heroRef.current.scrollLeft += 400;
      }
    }
  };
  



  return (
    <ScrollableContainer data={products} handleHeroNav={handleHeroNav} heroRef={heroRef} type={`products`} >
      <ProductsListContainer products={products} />
    </ScrollableContainer>
  )
};