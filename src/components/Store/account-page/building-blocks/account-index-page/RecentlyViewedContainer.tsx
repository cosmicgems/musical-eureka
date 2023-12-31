import React from 'react'
import RecentlyViewedCard from './recently-viewed/RecentlyViewedCard'

const RecentlyViewedContainer = ({
    products
}) => {
    return (
        <div className='recently-viewed-container'>
            {
                products.map((product) => (
                    <RecentlyViewedCard 
                    data={product}
                    />
                ))
            }
        </div>
    )
}

export default RecentlyViewedContainer