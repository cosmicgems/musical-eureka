import { Typography } from '@mui/material'
import React from 'react'

const UserGreetingText = ({user}) => {
// console.log(user);


    return (
        <>
            {
                user ?
                    <div className='px-3 '>
                        
                        <Typography variant='body1' className='gradient-text mb-2' sx={{fontSize: '1.5rem'}}>
                            Hello {user?.first_name},
                        </Typography>
                    
                    </div>
                :

                    <div onClick={(e)=> {e.stopPropagation()}} className='sm:hidden mt-6 mb-3 flex flex-col gap-1'>
                        
                        <Typography variant='body1' className='gradient-text mb-2 text-center' sx={{fontSize: '1.15rem'}}>
                            Cultivate a lifestyle worth living.
                        </Typography>
                        
                    </div>
            }
        </>
    )
}

export default UserGreetingText