import { Box, Button, CardMedia, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { useRouter } from 'next/router';
import React from 'react'



const SearchResults = ({results}) => {
    console.log(results.blogs);
    const titleResults = results.blogs.results;
    const bodyResults = results.blogs.results_body;

    const router = useRouter();

    const handleClick = (slug) => {
        router.push(`/articles/post/${slug}`)
    }
    
    return (
        <>
            {
                titleResults?.length > 0 &&
                    <Box sx={{ }} className="w-[100%] max-h-[33vh] overflow-y-auto">
                        {titleResults?.map((r, i) => (<Box key={r._id}  sx={{bgcolor: i % 2 ? grey[900] : grey[700],borderBottomLeftRadius: i === titleResults.length - 1 ?'5px' : "" ,borderBottomRightRadius: i === titleResults.length - 1 ?'5px' : "" }} className="flex items-center p-">
                                
                        <Button fullWidth onClick={ () => handleClick(r.slug)}>
                            <CardMedia 
                                sx={{}}
                                className='w-[50px] h-[50px]'
                                component="img"
                                image={r.photo  ? r.photo : "https://images.pexels.com/photos/3246665/pexels-photo-3246665.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" }
                                alt=''
                                />
                                <div className='flex flex-col gap-2 p-1 ml-12'>
                                    <Typography variant='h3' sx={{fontSize: '1.25rem'}} className={`${i % 2 ?  "gradient-text" : "gradient-text-category" }`}>
                                        {r.title}
                                    </Typography>
                                </div>                           
                        </Button>
                            </Box> 

                        ))}
                    </Box>

            }
        </>

    )
}

export default SearchResults