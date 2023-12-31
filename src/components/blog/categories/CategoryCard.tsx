import React from 'react'
import { Avatar, Box, Button, CardMedia, Chip, Grid, Typography } from '@mui/material'
import { grey } from '@mui/material/colors';


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
        <Box className="flex flex-col w-content w-[355px] h-[355px] sm:h-[375px] sm:w-[375px]" sx={{bgcolor:grey[900], borderRadius: '5px', background: `url(${p_tall})`, backgroundPosition: "center"}}>

            <div className='rounded' style={{ backgroundColor: "rgba(33, 33, 33, 0.3)", height: "100%"}}>
                <div className='flex flex-col px-3  gap-3 py-3'>
                    <Button href={`/articles/categories/category/${name}`}>
                        <Typography variant='h6' className='gradient-text text-center' sx={{}}>
                            {c_name}
                        </Typography>                    
                    </Button>
                    
                    <div className='p-0'>
                                
                        <Grid container className='justify-center align-center p-0  ' gap={1} >
                        {sub_categories.map((sc,i) => {
                            return (
                                <Grid item key={sc._id} xs={5} className='' >
                                    <Button className='w-full' href={`/articles/categories/category/${name}/subcategories/subcategory/${sc.slug}`} >
                                        <Chip
                                        avatar={<Avatar 
                                        alt={`Photo of ${sc.name}, ${sc.description}`} src={sc.photo_portrait} />}
                                        label={sc.name}
                                        variant="outlined"
                                        sx={{overflow: 'hidden', whiteSpace: 'nowrap', color:grey[50], textOverflow: 'ellipsis', maxWidth: '100%'}}
                                        />  
                                    </Button>
                                </Grid>

                            )
                        })}
                    </Grid>
                    </div>

                    <Typography variant='body1' sx={{color:grey[50]}} className='truncate-text w-[90%] sm:w-[100%]'   >
                            {description}      

                    </Typography>        
                </div>
            </div>

        </Box>
    )
}

export default CategoryCard