import { Avatar, Box, Button, CardMedia, Chip, Grid, Typography } from '@mui/material'
import { grey } from '@mui/material/colors';
import React from 'react'


interface CategoryProps {
    category: {
        _id: string;
        name: string;
        sub_categories: any[];
        photo_landscape: string;
        photo_portrait: string;
        description: string;
        slug: string;
        createdAt: Date;
        updatedAt: Date;
    };
}

const CategoryCard: React.FC<CategoryProps> = ( {category} ) => {

    const { _id:id, name: c_name, sub_categories, photo_landscape: p_wide, photo_portrait: p_tall, description, slug: name } = category;

    return (
        <Box className="flex flex-col w-content" sx={{bgcolor:grey[50], borderRadius: '5px'}}>
            <CardMedia
            component="img"
            image={p_wide}
            alt={`Image depicting the category by the name of ${c_name}, and the description of the category is: ${description}`}
            className=''
            sx={{objectFit: "cover", borderTopRightRadius: "5px", borderTopLeftRadius: "5px"}}
            />

            <div className='flex flex-col px-3  gap-3 py-3'>
                <Button href={`/articles/categories/category/${name}`}>
                    <Typography variant='h4' className='' sx={{}}>
                        {c_name}
                    </Typography>                    
                </Button>
                
                <div className='p-0'>
                            
                    <Grid container className=' p-0  ' gap={3} >
                    {sub_categories.map((sc,i) => {
                        return (
                            <Grid item key={sc._id} xs={4} className='' >
                                <Button href={`/articles/categories/category/${name}/subcategories/subcategory/${sc.slug}`} >
                                    <Chip
                                    avatar={<Avatar 
                                    alt={`Photo of ${sc.name}, ${sc.description}`} src={sc.photo_portrait} />}
                                    label={sc.name}
                                    variant="outlined"
                                    sx={{overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', maxWidth: '60%'}}
                                    />  
                                </Button>
                            </Grid>

                        )
                    })}
                </Grid>
                </div>

                <Typography variant='body1' className='truncate-text w-[350px] sm:w-[375px]'   >
                        {description}      

                </Typography>        
            </div>
        </Box>
    )
}

export default CategoryCard