import { Avatar, Box, Button, ButtonGroup, CardMedia, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import React from 'react'

const UserCard = ({user}) => {
    console.log(user)
    
    
  return (
    <Box className="" sx={{bgcolor: grey[900], borderRadius: '5px'}}>
        <div className='flex gap-1 w-[375px] h-[125px]'>
            {user.photo  ? 
                <CardMedia 
                component="img"
                image={user.photo}
                alt=''
                sx={{borderTopLeftRadius:'5px', borderBottomLeftRadius: "5px"}}
                className='w-2/6 h-[125px]'
                />                
                :
                <Avatar variant='square' sx={{borderTopLeftRadius: '5px', borderBottomLeftRadius: "5px"}} className='h-[125px] w-2/6'> <Typography  className='gradient-text-subcategories' variant='h2'>{user.first_name[0]}</Typography> </Avatar>
            }


            <div className='flex flex-col px-2 w-4/6 '>
                <Typography variant='body1' sx={{fontSize: "1.5rem"}} className='gradient-text-subcategories py-0'>
                    {user.username}
                </Typography>
                <Typography variant='body1' sx={{}} className='gradient-text-category'>
                    {user.first_name} {user.last_name}
                </Typography>
                
                <ButtonGroup fullWidth variant="text" aria-label="text button group">
                    <Button href={`/admin/dashboard/${user.username}`}>Dashboard</Button>
                    <Button href={`/admin/settings/${user.username}`}>Settings</Button>
                </ButtonGroup>
            </div>

        </div>
    </Box>
  )
}

export default UserCard