import { Avatar, Button, Chip, Grid } from '@mui/material'
import { grey } from '@mui/material/colors'
import React from 'react'

const FeaturedCardIdentifiers = ({
    subcategories, 
    categories
}) => {

    return (
        <Grid container className=' items-center' spacing={1} >
            {subcategories.map((sc,i) => {
                return (
                    <Grid item key={sc._id} xs={6}  >
                        <Button className='w-full'  href={`/articles/categories/category/${categories[0].slug}/subcategories/subcategory/${sc.slug}`}>
                            <Chip
                            avatar={<Avatar alt={`Photo of ${sc.name}, ${sc.desrciption}`} src={sc.photo_portrait} />}
                            label={sc.name}
                            sx={{overflow: 'hidden', whiteSpace: 'nowrap', color:grey[50], textOverflow: 'ellipsis', maxWidth: '100%'}}
                            variant="outlined"
                            />  
                        </Button>
                    </Grid>

                )
            })}
        </Grid>
    )

}

export default FeaturedCardIdentifiers