import { useRouter } from 'next/router'
import React from 'react'

const RecentlyViewedCardContainer = ({
    children, 
    image,
    path
}) => {
    const router = useRouter();
    console.log(path);
    

    const handlePageNavigation = async() => {
        
        try {
            router.push(`${path}`)
        } catch (error) {
            console.error(`Error: ${error}`)
        }

    }

    return (
        <div onClick={handlePageNavigation} className='recently-viewed-card-container' style={{backgroundImage: `url('${image})`}}>
            <div className='recently-viewed-card-container-inner-container'>
                {children}
            </div>
        </div>
    )
}

export default RecentlyViewedCardContainer