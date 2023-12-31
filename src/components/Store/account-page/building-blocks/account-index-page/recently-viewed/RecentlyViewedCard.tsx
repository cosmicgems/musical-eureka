import React from 'react'
import RecentlyViewedCardContainer from './RecentlyViewedCardContainer'
import RecentlyViewedCardHeader from './RecentlyViewedCardHeader'
import RecentlyViewedCardDescription from './RecentlyViewedCardDescription';
import RecentlyViewedCardActions from './RecentlyViewedCardActions';

const RecentlyViewedCard = ({data}) => {
    console.log(data);
    
    const {
        name,
        price,
        description,
        productId,
        image,
        id,
        path,
    } = data;
    return (
        <RecentlyViewedCardContainer 
        image={image} 
        path={path}
        >

            <RecentlyViewedCardHeader 
            name={name || `Placeholder Name`}
            price={price || `$20,000`}
            />

            <RecentlyViewedCardDescription 
            description={description || `Placeholder Description`}
            />

            <RecentlyViewedCardActions 
            productId={productId || `4898338989334`}
            id={id || `3884903040430`}
            />

        </RecentlyViewedCardContainer>
    )
}

export default RecentlyViewedCard