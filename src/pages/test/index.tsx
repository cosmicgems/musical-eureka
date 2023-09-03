import React, { useRef, useState, useEffect, useCallback } from 'react';
import RichTextEditor from '../../components/Text Editor/RichTextEditor';
import { Box, Button, CardContent, CardMedia, Checkbox, FormControl, FormControlLabel, FormGroup, TextField, Typography } from '@mui/material';
import { grey, red } from '@mui/material/colors';
import { useRouter } from 'next/router';
import axios from 'axios';
import parse from 'html-react-parser'

const Test = () => {

    const router = useRouter();
    
    const [file, setFile] = useState(null);
    const [fileDataURL, setFileDataURL] = useState(null);
    const [title, setTitle] = useState<string>('');
    const [body, setBody] = useState<string>('');
    const [categories, setCategories] = useState<any>([]);
    const [subcategories, setSubcategories] = useState<any>([]);
    const [checked, setChecked] = useState<any>([]);
    const [checkedSubcategory, setCheckedSubcategory] = useState<any>([]);
    const [values, setValues] = useState<any>({
        error: '',
        sizeError: '',
        success: '',
        formData: '',
        title: '',
        photo: '',
        hidePublishButton: false
    });
    const [receivedProps, setReceivedProps] = useState<any>({
        title: '',
        body: ''
    });
    const [localStorageBlog, setLocalStorageBlog] = useState<any>({})

    
    const handleReceivedProps = (props: any) => {
        setReceivedProps({title: props.title, body: props.body});
        setTitle(receivedProps.title);
        setBody(receivedProps.body);
    
    };

    
    
    

    const { photo,} = values;

    const initCategories = async () => {
        try {
        const response = await axios.get('/api/blog/category/get-all');
        console.log(response);
        
        setCategories(response.data.categories);

        } catch (error) {
        console.error(error);
        }
    };
    
    const initSubcategories = async () => {
        try {
        const responsesubcategories = await axios.get('/api/blog/subcategory/get-all');
        setSubcategories(responsesubcategories.data.subcategories);
        } catch (error) {
        console.error(error);
        }
    }

    

    const handleToggle = (c:any) => () => {
        setValues({...values, error: ''});
        const clickedCategory = checked.indexOf(c)
        const all = [...checked]

        if(clickedCategory === -1) {
            all.push(c)
        } else {
            all.splice(clickedCategory, 1)
        }
        console.log(all);
        setChecked(all);
    };

    const handleSubcategoryToggle = (t:any) => () => {
        setValues({...values, error: ''});
        const clickedSubcategory = checked.indexOf(t)
        const all = [...checkedSubcategory]

        if(clickedSubcategory === -1) {
            all.push(t)
        } else {
            all.splice(clickedSubcategory, 1)
        }
        console.log(all);
        setCheckedSubcategory(all)
    };

    const showCategories = () => {
        return (
            categories &&
                        
            <>
            {categories.map((c:any, i:number) => (
                <FormControlLabel onChange={handleToggle(c._id)} key={c._id} control={<Checkbox />} label={c.name} />
            ))}
            </>
        );
    };
    
    const showSubcategories = () => {
        return (
            subcategories &&
            
            <>
            {subcategories.map((t:any, i:number) => (
                <FormControlLabel onChange={handleSubcategoryToggle(t._id)} key={t._id} control={<Checkbox />} label={t.name} />
            ))}
            </>

        );
    };

    useEffect(()=>{
        initCategories();
        initSubcategories();
    }, [])

    const blogPost = {
        title,
        body,
        photo,
        categories,
        subcategories,
    }

    const blogPostJSON = JSON.stringify(blogPost);
    
    useEffect(() => {
        // Save title to local storage whenever it changes
        localStorage.setItem("Saved Post", blogPostJSON);
    }, [ blogPostJSON]);

    
    const submitBlog = async (e:any) => {
        e.preventDefault()
        console.log(title, body, categories, subcategories);
    };
    

    return (
        <>

            <Box className='min-h-screen p-6 flex flex-col' sx={{bgcolor: grey[500]}} >

                <div>

                </div>

                <div className='flex '>

                    <div className='sm:w-3/5'>

                        <form onSubmit={submitBlog}>

                            <RichTextEditor onPropsChange={handleReceivedProps}/>

                            <div className='px-3'>
                                <Button type='submit' variant='contained' >
                                Submit
                                </Button>    
                            </div>                             

                        </form>

                        
                    </div>

                    <div className='flex flex-col sm:w-2/5'>

                        <div className='p-3'>
                            <TextField fullWidth value={photo} label='photo' sx={{}} variant='outlined' onChange={(e)=>setValues({photo:e.target.value})} />
                        </div>

                        <div className='flex '>

                            <div className='p-3 w-1/3'>
                                <div>
                                    <Typography variant='h6' sx={{}}>
                                        Categories
                                    </Typography>                                
                                </div>
                                <FormGroup>
                                    {showCategories()}                   
                                </FormGroup>


                            </div>

                            <div className='p-3 w-1/3'>
                                <div>
                                    <Typography variant='h6' sx={{}}>
                                        Subcategories
                                    </Typography>                                
                                </div>
                                <FormGroup>
                                    {showSubcategories()}                
                                </FormGroup>                 
                            </div>

                            <div className='p-3 w-1/3'>
                                <Typography variant='h6' sx={{}}>
                                    Tags
                                </Typography>                        
                            </div>

                        </div>
                    </div>


                </div>  

                
                <div className='w-3/5 flex flex-col justify-center items-center'>
                    <div className='py-6'>
                        <Typography variant='h3' sx={{color: grey[50]}} className='font-bold'>
                            Post Preview 
                        </Typography>
                    </div>
                    <div style={{backgroundColor: "#FFF"}}>
                        <div className='w-full my-3'>
                            <CardMedia 
                            className='h-[10vh]'
                            sx={{objectFit: 'cover'}}
                            component='img'
                            src={photo}
                            alt="Image"
                            />
                        </div>
                        <div className='p-6'>
                            <div>
                                <Typography variant='h3' sx={{}} className='text-center'>
                                    {title}
                                </Typography>
                            </div>
                            <article>
                                    {parse(body)}
                            </article>                            
                        </div>

                    </div>

                </div>

            </Box>

        </>
    );
}

export default Test;