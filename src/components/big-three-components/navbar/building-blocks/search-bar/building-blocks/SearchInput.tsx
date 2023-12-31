import { TextField } from '@mui/material';
import { grey } from '@mui/material/colors'
import React from 'react'

const SearchInput = (
    props
) => {

    const { query, handleInputChange } = props;

    return (
        <TextField 
            size='small' 
            fullWidth 
            variant='outlined' 
            sx={{
                    bgcolor:grey[50], borderTopLeftRadius: '5px', borderBottomLeftRadius: "5px", borderTopRightRadius: "5px", borderBottomRightRadius:"5px"
                }} 
            label="Search for pearls..." 
            className='' 
            value={query} 
            onChange={(e) => {handleInputChange(e)}} />
    )
}

export default SearchInput