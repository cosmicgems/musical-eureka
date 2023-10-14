import { Box, Button, ButtonGroup, CardMedia, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import React from 'react'
import moment from 'moment'

const AdminCard = ({user}) => {
  return (
    <Box sx={{bgcolor: grey[900], borderRadius: "5px"}} className="w-full">
        
        <div className='flex gap-3'>

            <CardMedia 
            component="img"
            image={user.photo}
            alt=""
            sx={{borderTopLeftRadius: "5px", borderBottomLeftRadius: "5px"}}
            className='w-2/5 h-[250px]'
            />

            <div className='flex flex-col gap-2 justify-center w-full'>

                <div className='flex gap-2'>
                    <Typography variant='body1' sx={{fontSize: '1.25rem'}} className='gradient-text-category'>
                        Name
                    </Typography>
                    <Typography variant='body1' sx={{fontSize: '1.25rem', color: grey[50]}} className=''>
                        {user.first_name} {user.last_name}
                    </Typography>
                </div>

                <div className='flex gap-2'>
                    <Typography variant='body1' sx={{fontSize: '1.25rem'}} className='gradient-text-category'>
                        Member Since
                    </Typography>
                    <Typography variant='body1' sx={{fontSize: '1.25rem', color: grey[50]}} className=''>
                        {moment(user.createdAt).fromNow()}
                    </Typography>
                </div>

                <div className='flex flex-col gap-1'>
                    <Typography variant='body1' sx={{fontSize: '1.25rem'}} className='gradient-text-category'>
                        Bio
                    </Typography>
                    <Typography variant='body1' sx={{fontSize: '1rem', color: grey[50]}} className=''>
                        {user.about}
                    </Typography>
                </div>
                
                {/* <ButtonGroup fullWidth variant="text" aria-label="text button group">
                    <Button href={`/admin/dashboard/${user.username}`}>Dashboard</Button>
                    <Button href={`/admin/settings/${user.username}`}>Settings</Button>
                </ButtonGroup> */}

            </div>

        </div>

    </Box>
  )
}

export default AdminCard