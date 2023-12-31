import React from 'react'
import { Avatar, Box, Button, CardMedia, Chip, Grid, Typography } from '@mui/material'
import { grey } from '@mui/material/colors';


interface SubcategoryProps {
    subcategory: {
        _id: string;
        name: string;
        sub_categories: any[];
        photo_landscape: string;
        photo_portrait: string;
        description: string;
        slug: string;
        createdAt: Date;
        updatedAt: Date;
    },
    category: any;
}

const CategoryCard: React.FC<SubcategoryProps> = ( {subcategory, category} ) => {
    // console.log(category);
    

    const { _id:id, name: c_name, photo_landscape: p_wide, photo_portrait: p_tall, description, slug: name } = subcategory;


    return (
        <Box className="flex flex-col w-content w-[355px] h-[355px] sm:h-[375px] sm:w-[375px]" sx={{bgcolor:grey[900], borderRadius: '5px', background: `url(${p_tall})`, backgroundPosition: "center",
        boxShadow: '5px 5px 5px #000',}}>

            <div className='rounded' style={{ backgroundColor: "rgba(33, 33, 33, 0.3)", height: "100%"}}>
                <div className='flex flex-col px-3  gap-3 py-3 justify-center h-full'>
                    
                    <div className='card-glass '>
                        <Button fullWidth href={`/articles/categories/category/${name}`}>
                            <Typography variant='h6' className='gradient-text text-center' sx={{}}>
                                {c_name}
                            </Typography>                    
                        </Button>                        
                    </div>

                    <div className='card-glass'>
                        <Typography variant='body1' sx={{color:grey[50]}} className='truncate-text w-[90%] sm:w-[100%]'   >
                                {description}      

                        </Typography>                         
                    </div>
       
                </div>
            </div>

        </Box>
    )
}

export default CategoryCard