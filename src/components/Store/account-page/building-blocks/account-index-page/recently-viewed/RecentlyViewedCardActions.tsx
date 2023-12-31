import React from 'react'
import AddShoppingCartRoundedIcon from '@mui/icons-material/AddShoppingCartRounded';
import PlaylistRemoveRoundedIcon from '@mui/icons-material/PlaylistRemoveRounded';
import { Button } from '@mui/material';
import { green, grey, red } from '@mui/material/colors';




const RecentlyViewedCardActions = ({
    productId,
    id
}) => {
    return (
        <div 
        className='flex justify-between recently-viewed-card-section-wrapper'
        >

            <Button>
                <AddShoppingCartRoundedIcon sx={{color: green[500]}} />
            </Button>
            
            <Button>
                <PlaylistRemoveRoundedIcon sx={{color: red[500]}} />
            </Button>
            
        </div>
    )
}

export default RecentlyViewedCardActions