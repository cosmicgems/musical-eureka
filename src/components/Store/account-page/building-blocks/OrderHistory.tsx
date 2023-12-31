import { Typography } from '@mui/material';
import React from 'react'
import OrderHistoryHeader from './order-history/OrderHistoryHeader';
import OrderLineItem from './order-history/OrderLineItem';



const OrderHistory = (
    props: any
) => {

    const { } = props;

    
    
    return (

        <div className='flex justify-center'>

            <div className='basis-4/5'>
                <OrderHistoryHeader />
                {[2,2,2,2,2,2,].map((item, index) => (
                    <OrderLineItem orderNo={`${index}894r48943j89403r${index}`} date={`Oct-${index + 1}-2020`} price={`$${index + 1}3506.78`} index={index} />
                ))}                
            </div>

            

        </div>

    )

}

export default OrderHistory