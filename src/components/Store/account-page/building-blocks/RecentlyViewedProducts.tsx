import React from 'react'
import RecentlyViewedContainer from './account-index-page/RecentlyViewedContainer'

const RecentlyViewedProducts = ({
    products
}) => {
    return (
        <div>
            <RecentlyViewedContainer 
            products={products}
            />             
        </div>

    )
}

export default RecentlyViewedProducts