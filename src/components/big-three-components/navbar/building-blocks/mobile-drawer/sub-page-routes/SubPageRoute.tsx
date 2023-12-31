import { ListItem, ListItemButton, ListItemText, Typography } from '@mui/material'
import React from 'react'

const PageRoute = ({
    page
}) => {
    return (

        <ListItem disablePadding>
            <ListItemButton href={page.path} sx={{ textAlign: 'left' }}>
                <ListItemText  className='gradient-text' >
                    <Typography className='font-bold' variant='h3' sx={{fontSize: '1.25rem'}}>
                        {page.name.toLocaleUpperCase()}
                    </Typography>
                </ListItemText>
            </ListItemButton>
        </ListItem>

    )
}

export default PageRoute