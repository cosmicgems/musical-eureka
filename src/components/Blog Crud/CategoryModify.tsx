import { Avatar, Box, Button, ButtonBase, CardMedia, Checkbox, FormControlLabel, FormGroup, Grid, TextField, Typography } from '@mui/material';
import { amber, grey, red } from '@mui/material/colors';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import subcategory from '../../../sanity/schemas/subcategory';

const CategoryModify = () => {

    const [categories, setCategories] = useState<any>([]);
    const [subcategories, setSubcategories] = useState<any>([]);
    const [checkedSubcategory, setCheckedSubcategory] = useState<any>([]);
    const [clicked, setClicked] = useState<string>("");
    const [update, setUpdate] = useState<boolean>(false);
    const [readyForSubmit, setReadyForSubmit] = useState<boolean>(false);
    const [category, setCategory] = useState<any>({
        name: '',
        description: '',
        photo_landscape: '',
        photo_portrait: '',
        slug: '',
        id: '',
        sub_categories: [],
    })

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
    };

    useEffect(() => {
        initCategories();
        initSubcategories();
    }, []);



    const handleClick = (c:any) => {
            setClicked(c._id);
            setCheckedSubcategory(c.sub_categories)
            setCategory({
                name:c.name,
                description: c.description,
                photo_landscape: c.photo_landscape,
                photo_portrait: c.photo_portrait,
                slug: c.slug,
                id: c._id,
                sub_categories: checkedSubcategory,
            })
            setUpdate(true)      

    }

    const handleUpdateCategory = (c:any) => {
        setUpdate(false);
        setCheckedSubcategory(c.sub_categories)
        setCategory({
            name:c.name,
            description: c.description,
            photo_landscape: c.photo_landscape,
            photo_portrait: c.photo_portrait,
            slug: c.slug,
            id: c._id,
            sub_categories: checkedSubcategory,
        })
        setReadyForSubmit(true);

    }

    const handleUpdate = async (category:any) => {
        try {
            console.log(category);
            const updatedCat = await axios.put(`/api/blog/category/update/${category.slug}`, category)
            console.log(updatedCat.data.cat);
            setClicked("");
            setReadyForSubmit(false);
        } catch (error) {
            
        }

        
        
    }

    const handleSubcategoryToggle = (t:any) => () => {
        console.log(t);
        
        const clickedSubcategory = checkedSubcategory.indexOf(t)
        const all = [...checkedSubcategory]

        if(clickedSubcategory === -1) {
            all.push(t)
        } else {
            all.splice(clickedSubcategory, 1)
        }
        console.log(all);
        setCheckedSubcategory(all)
        const allLocal = JSON.stringify(all)
        localStorage.setItem("Subcategories: Category Update", allLocal)
        setCategory({...category,
            sub_categories: all
        })
        
    };



    return (
        <Box className='flex flex-col gap-3' sx={{}}>

            {categories.map((c:any, i:number)=>{
                return (
                    <div  key={categories._id} onClick={()=>handleClick(c)}>
                        <Box sx={{bgcolor: i % 2 === 0 ? grey[500] : grey[700], borderRadius: '10px'}} className="p-3">

                            <div className='flex flex-row gap-3 justify-between items-center w-full'>

                                <div className='w-3/5'>
                                    <Typography variant='h4' sx={{}} className='w-full'>
                                        {c.name}
                                    </Typography>
                                </div>                                    
                          


                                <div className='w-2/5 flex justify-end' >
                                    <Avatar
                                        alt={c.description}
                                        src={c.photo_landscape}
                                        sx={{ width: "10vh", height: "10vh" }}
                                        />
                                </div>                

                            </div>

                            {clicked === c._id ?
                                <div className='my-3 '>
                                    <form>

                                        {update ?
                                            <div className='flex flex-col gap-3'>

                                                <div className='mt-3'>
                                                    
                                                    <FormGroup >
                                                        <Grid container spacing={3} className='h-[25vh] p-3 pt-0 mt-3' sx={{overflowY:"auto"}}>

                                                            {subcategories.map((sc:any, i:number)=> {
                                                                return (
                                                                    <Grid key={sc._id} item sm={6}>
                                                                        <FormControlLabel  onChange={handleSubcategoryToggle(sc._id)} control={<Checkbox  checked={checkedSubcategory.includes(sc._id)}  />} label={sc.name} />
                                                                    </Grid>
                                                                    
                                                                )
                                                            })}
                                                        </Grid>
                                                        
                                                    </FormGroup>

                                                </div>

                                                <div>
                                                    <TextField
                                                        value={category.name}
                                                        sx={{}}
                                                        className=""
                                                        variant='outlined'
                                                        label="name"
                                                        onChange={(e) => setCategory({ ...category, name: e.target.value })}
                                                    />
                                                </div>

                                                <div>
                                                    <TextField
                                                        onChange={(e) => setCategory({ ...category, description: e.target.value })}
                                                        fullWidth
                                                        multiline
                                                        rows={5}
                                                        variant='outlined'
                                                        sx={{}}
                                                        value={category.description}
                                                        className=''
                                                        label="Description"
                                                    />
                                                </div>

                                                <div>
                                                    <TextField
                                                        onChange={(e) => setCategory({ ...category, photo_landscape: e.target.value })}
                                                        fullWidth
                                                        variant='outlined'
                                                        sx={{}}
                                                        className=''
                                                        value={category.photo_landscape}
                                                        label='Photo Landscape'
                                                    />
                                                </div>

                                                <div>
                                                    <TextField
                                                        onChange={(e) => setCategory({ ...category, photo_portrait: e.target.value })}
                                                        fullWidth
                                                        variant='outlined'
                                                        sx={{}}
                                                        className=''
                                                        value={category.photo_portrait}
                                                        label='Photo Portrait'
                                                    />
                                                </div>

                                            </div>

                                            : 
                                            <div>
                                                <Typography variant='body1' sx={{}} className=''>
                                                    {c.description}
                                                </Typography>                                
                                            </div>                                    
                                        }



                                        <div className='flex flex-row gap-6 justify-center mt-3'>
                                          
                                                <Button onClick={()=>handleUpdate(category)}  variant="contained" sx={{bgcolor: amber[500]}} className="">
                                                    Update
                                                </Button>  


                                            <Button variant="contained" sx={{bgcolor: red[500]}} className="">
                                                Delete
                                            </Button>

                                        </div>


                                    </form>


                                </div>
                            : ""
                            }

                        </Box>                        
                    </div>

                )
            })}



        </Box>
    )
};

export default CategoryModify;