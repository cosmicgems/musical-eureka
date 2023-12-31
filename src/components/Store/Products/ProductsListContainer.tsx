import React, { useCallback, useEffect, useRef, useState } from 'react'
import axios from 'axios';
import ProductCard from './RefactoredComponents/products/ProductCard';
import { useRouter } from 'next/router';
import { ImageListItem, Typography, ImageList, ButtonGroup, Button } from '@mui/material';

const ProductsListContainer = ({products}) => {

    const router = useRouter();
    
    const goToProductPage = productPath => router.push(`/store/products/product${productPath}`);

    const [loadedProducts, setLoadedProducts] = useState<any>([]);
    const [hasNextPage, setHasNextPage] = useState<boolean>(null);
    const [loading, setLoading] =useState<boolean>(false);
    
    const loadMoreRef = useRef<HTMLDivElement>();
    const loadMoreTwoRef = useRef<HTMLDivElement>(null);


    // const loadMoreProducts = useCallback(async ( hasNextPage, ) => {
    //     const data = {first: 24, after: cursor}
    //     try {
            
    //         if (hasNextPage || hasNextPage === null) {
    //             setLoading(true);
    //             const res =  await axios.post("/api/store/load-more-products", {data});
    //             console.log(res.data);

                

            
    //             setLoadedProducts((prevLoadedProducts) => [
    //                 ...prevLoadedProducts,
    //                 ...res.data.products.data.products.edges.map((pro) => pro)
    //             ]);

    //             if(res.data.products.data.products.pageInfo.hasNextPage){
    //                 setHasNextPage(true);
    //                 setCursor(res.data.products.data.products.pageInfo.endCursor)
    //                 setLoading(false)
    //             } else {
    //                 setHasNextPage(false);
    //                 setCursor(res.data.products.data.products.pageInfo.endCursor)
    //                 setLoading(false)
    //             }
    //     } else {
    //         // All blogs are loaded
    //         console.log('All blogs are loaded.');
    //     }
    //     } catch (error) {
    //         console.error('Error fetching more blogs:', error);
    //     } finally {
    //         setLoading(false);
    //     }
    // }, [cursor]);

    // useEffect(() => {
    //     console.log(loadMoreRef);

    //     if (!loadMoreRef?.current) return;

    //     // if(!hasNextPage) return;
    //     const observer = new IntersectionObserver(
    //     (entries) => {
    //         console.log(entries);
    //         if (entries[0].isIntersecting) {
    //         // Load more blogs when the target div becomes visible
    //         loadMoreProducts(hasNextPage);
    //         }
    //     },
    //     { threshold: 0.2 } // Adjust the threshold as needed
    //     );

    //     if (loadMoreRef.current) {
    //     observer.observe(loadMoreRef.current);
    //     console.log("It triggered");
    // }

    // const currentRef = loadMoreRef.current;

    // return () => {
    // if (currentRef) {
    //     observer.unobserve(currentRef);
    // }
    // };
    // }, [loadMoreRef, loadMoreProducts, hasNextPage]);


    return (
        <>
            {
                (products && products.length > 0) ?
                <>
                {
                    products.map((product, i) => {
                    if(loadedProducts.length === 0 && i === products.length - 1) {
                        return (
                            <ProductCard key={` ${i} productsPage`}  goToProductPage={goToProductPage} product={product}  />
                        )
                    }
                    
                    return (
                        <ProductCard key={` ${i} productsPage`} goToProductPage={goToProductPage} product={product} />
                    )
                    })
                }            
                </>
                :
                <Typography variant="body1" align="center">There are no products in this collection</Typography>
            }
        </>
    )
}

export default ProductsListContainer