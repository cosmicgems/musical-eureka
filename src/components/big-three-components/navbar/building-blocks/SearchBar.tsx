import { Box, Button, CardMedia, TextField, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import SearchInput from './search-bar/building-blocks/SearchInput';
import SearchResults from './search-bar/building-blocks/SearchResults';



const SearchBar = () => {
    const [query, setQuery] = useState<string>("");
    const [debouncedQuery, setDebouncedQuery] = useState('');
    const [search, setSearch] = useState<any>({
        videos: [],
        blogs: [],
    });
    const titleResults = search.blogs.results;
    const bodyResults = search.blogs.results_body;
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setQuery("");
        setSearch({
            videos: [],
            blogs: []
        });
        setDebouncedQuery("");
        setOpen(false)
    };

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
                handleOpen()
            } catch (error) {
                console.error('Error fetching search results:', error);
            }


            };    
            
            const debounceTimeout = setTimeout(() => {
            performSearch();
            }, 500); 
        
        console.log(open);
        return () => clearTimeout(debounceTimeout); 
        
    }, [debouncedQuery, open]);
    
    useEffect(()=> {
        console.log(open);
        
    }, [])
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
                <SearchInput
                query={query}
                handleInputChange={handleInputChange}
                />
                {
                    titleResults?.length > 0 &&
                        <>
                            <SearchResults 
                            handleOpen={handleOpen}
                            handleClose={handleClose}
                            open={open}
                            titleResults={titleResults}
                            handleClick={handleClick}
                            />
                        </>


                }
            </div>
        </>

    )
}

export default SearchBar