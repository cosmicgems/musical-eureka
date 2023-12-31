import { Box, Button, CardMedia, TextField, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'



const SearchResults = () => {
    const [query, setQuery] = useState<string>("");
    const [debouncedQuery, setDebouncedQuery] = useState('');
    const [search, setSearch] = useState<any>({
        videos: [],
        blogs: [],
    });
    const titleResults = search.blogs.results;
    const bodyResults = search.blogs.results_body;

    const router = useRouter();

    const handleClick = (slug) => {
        router.push(`/articles/post/${slug}`)
    }

    useEffect(() => {
        // Define a function to perform the actual search when debouncedQuery changes
        const performSearch = async () => {
            if (debouncedQuery.trim() === '') {
                // Clear the search results if the query is empty
                setSearch({...search ,blogs:[]});
                return;
            }
        
           
            try {
                const response = await axios.get('/api/search', {
                    params: {
                        query: debouncedQuery
                    },
                })
                const data = await response.data.suggestions
                console.log(data, "where's this");
                
                setSearch({...search, blogs: data})
            } catch (error) {
                console.error('Error fetching search results:', error);
            }
            };    
            
            const debounceTimeout = setTimeout(() => {
            performSearch();
            }, 500); 
        
        return () => clearTimeout(debounceTimeout); 
    }, [debouncedQuery]);
    
    const handleInputChange = (e) => {
        
        setDebouncedQuery(e.target.value);
        setQuery(e.target.value)

    };

    const handleSearch = async () => {
        try {
            const response = await axios.get('/api/youtube', {
                params: {
                query: query,
            },
        });

        setSearch({...search, videos: response.data.videos})

            const blogs = await axios.get('/api/search', {
                params: {
                    query: query
                },
            })
    
            setSearch({...search, blogs: blogs.data.suggestions})
        
        } catch (error) {
            console.error('Error searching videos:', error);
        }
    };
    
    return (
        <>
            <div className='w-full flex flex-col gap-0 '>
                <TextField  fullWidth variant='outlined' sx={{bgcolor:grey[50], borderTopLeftRadius: '5px', borderBottomLeftRadius: "5px", borderTopRightRadius: "5px", borderBottomRightRadius:"5px"}} label="Search for pearls..." className='' value={query} onChange={(e) => {handleInputChange(e)}} />
                {
                    titleResults?.length > 0 &&
                        <Box sx={{ }} className="w-[100%] max-h-[33vh] overflow-y-auto overflow-x-hidden">
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
            </div>
        </>

    )
}

export default SearchResults