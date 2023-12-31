import { Typography } from '@mui/material'
import { refundPolicy } from 'public/assets/policies'
import React from 'react'

const RefundPolicy = () => {
    return (
        <div className='w-full px-12'>

            <ol className='w-3/4'>
                {
                    refundPolicy.map((p, i) => (
                            <li key={`${p.name} ${Math.random() * 10 + (Math.random() * (Math.random() *3092.3))}`}>
                                <div className='flex flex-col'>
                                    <Typography variant='body2' className='font-bold'>
                                        {p.name}
                                    </Typography>
                                    <ul>
                                        {
                                            p.parts.map((part, i) => (
                                                <li>
                                                    <Typography variant='caption' className=''>
                                                        <span className='font-bold'>{part.name}:</span> {part.description} 
                                                    </Typography>
                                                </li>
                                            ))
                                        }
                                    </ul>
                                </div>
                            </li>
                    ))
                }
            </ol>
        </div>
    )
}

export default RefundPolicy