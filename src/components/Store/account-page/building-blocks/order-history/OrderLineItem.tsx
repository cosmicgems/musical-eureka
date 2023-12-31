import { Box, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import React from 'react'

const OrderLineItem = (props: any) => {

    const { 
        orderNo,
        index, 
        date,
        price,
    } = props;

    return (
        <Box className='flex py-1' sx={{bgcolor: index % 2 !== 0 ? grey[100] : grey[300]}}>

            <div className='basis-[10%] p-2'>
                <Typography className='text-left block' variant='caption' >
                    {index}
                </Typography>
            </div>
            <div className='basis-[20%] p-2'>
                <Typography className='text-left block' variant='caption' >
                    {date}
                </Typography>
            </div>

            <div className='basis-[50%] p-2'>
                <Typography className='text-left block' variant='caption' >
                    {orderNo}
                </Typography>
            </div>

            <div className='basis-[20%] p-2'>
                <Typography className='text-right block' variant='caption' >
                    {price}
                </Typography>
            </div>

        </Box>
    )
}

export default OrderLineItem