import { Typography } from '@mui/material';
import React from 'react'

const OrderHistoryHeader = (props: any) => {

    const { 
        orderNo, 
        date,
        price,
    } = props;

    return (
        <div className='flex p-1'>

            <div className='basis-[10%] p-1'>
                <Typography className='text-left' variant='h6' >
                    #
                </Typography>
            </div>
            <div className='basis-[20%] p-1'>
                <Typography className='text-left' variant='h6' >
                    Date
                </Typography>
            </div>

            <div className='basis-[50%] p-1'>
                <Typography className='text-left' variant='h6' >
                    Order No
                </Typography>
            </div>

            <div className='basis-[20%] p-1'>
                <Typography className='text-right' variant='h6' >
                    Price
                </Typography>
            </div>

        </div>
    )
}

export default OrderHistoryHeader