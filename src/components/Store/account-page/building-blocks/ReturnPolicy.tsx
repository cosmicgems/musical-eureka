import { Typography } from '@mui/material'
import { returnPolicy } from 'public/assets/policies'
import React from 'react'

const ReturnPolicy = () => {
    console.log(returnPolicy);
    
    return (
        <div className='w-full flex px-12 '>

            <ol className='w-3/4'>
                {
                    returnPolicy.map((p) => (
                            <li key={`${p.name} key`}>
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

export default ReturnPolicy