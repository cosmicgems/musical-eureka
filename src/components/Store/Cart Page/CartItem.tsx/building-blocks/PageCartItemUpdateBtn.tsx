import { Button } from '@mui/material';
import React from 'react'

const PageCartItemUpdateBtn = ({setEditCart, editCart}) => {
    return (
        <div className='w-1/6'>
            {
                editCart ?
                    <Button className='w-1/5' onClick={(e)=> {e.preventDefault(); setEditCart(!editCart)}}>
                        Done
                    </Button>    
                :
                    <Button className='w-1/5' onClick={(e)=> {e.preventDefault(); setEditCart(!editCart)}}>
                        Change
                    </Button>                  
            }
        </div>
    )
}

export default PageCartItemUpdateBtn