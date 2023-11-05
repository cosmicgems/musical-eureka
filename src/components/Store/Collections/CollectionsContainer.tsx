import React, { useCallback, useEffect, useRef, useState } from 'react'
import ProductCard from '../Products/ProductCard';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Typography } from '@mui/material';

const CollectionsContainer = ({products, collectionName}) => {
    console.log(collectionName);
    
    const router = useRouter()
    
    const goToProductPage = productHandle => router.push(`/store/products/product/${productHandle}`);

    const [loadedProducts, setLoadedProducts] = useState<any>([]);
    const [hasNextPage, setHasNextPage] = useState<boolean>(null);
    const [loading, setLoading] =useState<boolean>(false);
    const [cursor, setCursor] = useState<string>(products[products.length - 1].cursor)
  
    const loadMoreRef = useRef<HTMLDivElement>();
    const loadMoreTwoRef = useRef<HTMLDivElement>(null);


    const loadMoreProducts = useCallback(async ( hasNextPage, ) => {
        const data = {first: 24, after: cursor, collectionName}
        try {
            
            if (hasNextPage || hasNextPage === null) {
                setLoading(true);
                const res =  await axios.post("/api/store/load-more-collection-products", {data});
                console.log(res.data);

                

            
                setLoadedProducts((prevLoadedProducts) => [
                    ...prevLoadedProducts,
                    ...res.data.products.data.collection.products.edges.map((pro) => pro)
                ]);

                if(res.data.products.data.products.pageInfo.hasNextPage){
                    setHasNextPage(true);
                    setCursor(res.data.products.data.collection.products.pageInfo.endCursor)
                    setLoading(false)
                } else {
                    setHasNextPage(false);
                    setCursor(res.data.products.data.collection.products.pageInfo.endCursor)
                    setLoading(false)
                }
        } else {
            // All blogs are loaded
            console.log('All blogs are loaded.');
        }
        } catch (error) {
            console.error('Error fetching more blogs:', error);
        } finally {
            setLoading(false);
        }
    }, [cursor]);

    useEffect(() => {
        console.log(loadMoreRef);

        if (!loadMoreRef?.current) return;

        // if(!hasNextPage) return;
        const observer = new IntersectionObserver(
        (entries) => {
            console.log(entries);
            if (entries[0].isIntersecting) {
            // Load more blogs when the target div becomes visible
            loadMoreProducts(hasNextPage);
            }
        },
        { threshold: 0.2 } // Adjust the threshold as needed
        );

        if (loadMoreRef.current) {
        observer.observe(loadMoreRef.current);
        console.log("It triggered");
    }

    const currentRef = loadMoreRef.current;

    return () => {
    if (currentRef) {
        observer.unobserve(currentRef);
    }
    };
    }, [loadMoreRef, loadMoreProducts, hasNextPage]);

    useEffect(() => {
    if(!loadMoreTwoRef?.current) return;

    if(hasNextPage === false) return;
    const observer = new IntersectionObserver(
        (entries) => {
            if (entries[0].isIntersecting) {
                
                // Load more blogs when the target div becomes visible
                loadMoreProducts(hasNextPage);
            }
        },
        { threshold: 0.1 } // Adjust the threshold as needed
    );

    if (loadMoreTwoRef.current) {
        observer.observe(loadMoreTwoRef.current);
                console.log("It triggered");
    }
    let w = loadMoreTwoRef.current
    return () => {
        if (w) {
            observer.unobserve(w);
        }
    };
    }, [ hasNextPage, loadMoreProducts]);

  return (
    <>
    {
        products.map((product, i) => {
        if(loadedProducts.length === 0 && i === products.length - 1) {
            return (
            <div className='flex' key={` ${product.node.id} productsPage`}>
                <ProductCard goToProductPage={goToProductPage} product={product} />
            
                <div ref={loadMoreRef} className='h-[20vh] w-[20vw]'>
                    <Typography variant='caption' className='gradient-text-home' sx={{}} component="div">
                    Loading more products...
                    </Typography>
                </div>                                
        
            </div>
            )
        }
        
        return (
            <div key={` ${product.node.id} productsPage`}>
            <ProductCard goToProductPage={goToProductPage} product={product} />
            </div>
        )
        })
    }
    {
        loadedProducts.length > 0 &&
        <>
        {
            loadedProducts.map((product, i) => {
            if(loadedProducts.length > 0 && i === loadedProducts.length - 1) {
            return (
                <div className='flex' key={` ${product.node.id} productsPage`}>
                <ProductCard goToProductPage={goToProductPage} product={product} />
                {
                    !hasNextPage ?
                    null :
                <div ref={loadMoreRef} className='h-full flex justify-center items-center'>
                    <Typography variant='caption' className='gradient-text-home' sx={{}} component="div">
                    Loading more products...
                    </Typography>
                </div>                            
                }

                </div>
            )
            }
            return (
                <div key={` ${product.node.id} productsPage`}>
                <ProductCard goToProductPage={goToProductPage} product={product} />
                </div>
            )
            })
        }                      
        </>
    }            
    </>
  )
}

export default CollectionsContainer