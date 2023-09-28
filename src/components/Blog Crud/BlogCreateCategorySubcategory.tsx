import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Typography } from '@mui/material'
import React from 'react'

const BlogCreateCategorySubcategory = ({ selected, categories, setSelected, initSubcategories}) => {

    
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event);
        
        setSelected((event.target as HTMLInputElement)?.value);
    };


    return (
        <div>
            
            <div>
                <Typography variant='h6' sx={{}}>
                    Categories
                </Typography>                                
            </div>
            <FormControl>
            {/* <FormLabel id="demo-controlled-radio-buttons-group">Gender</FormLabel> */}
            <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={selected}
                onChange={(e)=> {setSelected(e.target.value); initSubcategories(e.target.value) }}
            >
                
                {categories.map((c,i) => {
                    return (
                <FormControlLabel  key={c._id}   value={c._id} control={<Radio />} label={c.name} />
)
                })}
            </RadioGroup>
            </FormControl>
        </div>
    )
}

export default BlogCreateCategorySubcategory