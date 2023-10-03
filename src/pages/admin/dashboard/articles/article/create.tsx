import React, { useRef, useState, useEffect } from 'react';
import { Box, Button, TextField, CardMedia, Checkbox, FormControlLabel, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { useRouter } from 'next/router';
import axios from 'axios';
import parse from 'html-react-parser'
import { getSession, useSession } from 'next-auth/react';
import Layout from '../../../../../components/Layout';
import TextEditor from '../../../../../components/Blog Crud/TextEditor';
import BlogCreateCategorySubcategory from '../../../../../components/Blog Crud/BlogCreateCategorySubcategory';
import SendingStatus from '../../../../../components/Blog Crud/SendingStatus';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import Loading from '../../../../../components/Loading';

const Test = () => {
    const router = useRouter()

    const {data: session, status} = useSession() as any;

    const [title, setTitle] = useState<string>('');
    const [body, setBody] = useState<string>('');
    const [tags, setTags] = useState<any>([]);
    const [tag, setTag] = useState<string>("");
    const [categories, setCategories] = useState<any>([]);
    const [subcategories, setSubcategories] = useState<any>([]);
    const [checked, setChecked] = useState<any>([]);
    const [selected, setSelected] = useState<string>("");
    const [checkedSubcategory, setCheckedSubcategory] = useState<any>([]);
    const [savedWork, setSavedWork] = useState<boolean>(null);
    const [editorContent, setEditorContent] = useState<string>('');
    const [savedPost, setSavedPost] = useState<boolean>(null)
    const [cleared, setCleared] = useState<boolean>(false);
    const [user, setUser] = useState<any>({});
    const [excerpt, setExcerpt] = useState<string>("");
    const [localStorageBlog, setLocalStorageBlog] = useState<any>({});
    const [values, setValues] = useState<any>({
        error: null,
        errorMessage: '',
        sizeError: '',
        success: null,
        successMessage: '',
        photo: '',
        hidePublishButton: false,
        sending: false,
    });
    const [verified, setVerified] = useState<boolean>(null);

    const { photo } = values;

    const initCategories = async () => {
        try {
        const response = await axios.get('/api/blog/category/get-all');
        // console.log(response);
        
        setCategories(response.data.categories);


        } catch (error) {
        console.error(error);
        }
    };

    const handleSubcategoryToggle = (t:any) => () => {
        setValues({...values, error: ''});
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
        localStorage.setItem("Subcategories", allLocal)
    };

    const initSubcategories = (id) => {
        console.log(id);
        
        setSelected(id)
        const cat = categories.filter((c) => 
            c._id == id
        )

        const sub = cat[0].sub_categories
        console.log(cat[0].sub_categories);
        
        setSubcategories(sub);
        
    }

    useEffect(()=>{
        if (categories.length === 0){
            initCategories();
        }
  
    }, [categories])



    const submitBlog = async (e: any) => {
        setValues({ sending: true });
        e.preventDefault();
        try {
            const postData = { title, body: editorContent, selected, checkedSubcategory, photo, user, excerpt,tags };
            console.log(postData);
            const post = await axios.post("/api/blog/post/create", postData);
            console.log(post.data.blogPost);
            setValues({
                sending: false,
                success: true,
                successMessage: post.data.message,
            });
        } catch (error) {
            console.error(error)
            setValues({
                sending: false,
                success: false,
                error: true,
                errorMessage: `There was an error submitting ${title}, please try again.`,
            });
            setTimeout(() => {
                setValues((prevValues:any) => ({
                    ...prevValues,
                    success: null,
                    error: null,
                    successMessage: '',
                    errorMessage: '',
                }));           
            }, 3500);

            return
        }
    
        setTimeout(() => {
            setValues((prevValues:any) => ({
                ...prevValues,
                success: null,
                error: null,
                successMessage: '',
                errorMessage: '',
            }));
        handleLocalStorageClear();            
        }, 3500);

    };

    const handleSavedWork = (action:boolean) => {
        if(action){
            setSavedWork(action);
        } else if (!action){
            setSavedWork(action);
            localStorage.removeItem("Photo")
            localStorage.removeItem("Body")
            localStorage.removeItem("Title")
        }
    }

    const handleAddTag = (tag) => {
        let t = tag ;
        const arrayTags = tags;
        arrayTags.push(t);
        setTags(arrayTags)
        console.log(tags);
        setTag("");
        

    }

    const handleChange = (type: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        if (type === 'photo') {
            setValues({photo:e.target.value});
            localStorage.setItem('Photo', e.target.value)
            setCleared(false);
        } else if(type === 'title') {
            setTitle(e.target.value);
            localStorage.setItem('Title', e.target.value);
            setCleared(false);
        } else if (type === 'excerpt'){
            setExcerpt(e.target.value);
            localStorage.setItem('Excerpt', e.target.value);
        } 
        // else if (type === "tag"){
        //     console.log(tags);
        //     handleAddTag(e.target.value);
        //     localStorage.setItem('Excerpt', e.target.value);
        // }
    };

    const handleEditorChange = (content: string) => {
        setEditorContent(content);
        localStorage.setItem("Body", content);
        setCleared(false);
    };
    
    
    const handleLocalStorageClear = () => {
        localStorage.removeItem("Title");
        localStorage.removeItem("Body");
        localStorage.removeItem("Photo");
        localStorage.removeItem("Categories");
        localStorage.removeItem("Subcategories");
        setTitle('');
        setEditorContent('');
        setValues({photo: ''});
        setChecked([]);
        setExcerpt("");
        setCheckedSubcategory([]);
        setCleared(true);
    }

    const sessionCheck = async() => {
        if(session.user._id ) {
            setVerified(true);
            return true
        } else if (!session.user._id){
            setVerified(false)
            return false
        }
    }

    if(status === "loading" ) {
        return <Loading />
    }
    
    if(verified === null) {
        const authenticated = sessionCheck();
        if(!authenticated){
            router.push("auth/login")
        }
    }


    
    if(verified && session.user.role === 24){
        return (
            <>

                <Box className='min-h-screen p-6 flex flex-col pt-12' sx={{bgcolor: grey[100]}} >
                    <Layout>
                        <div className='mb-4' />

                            <SendingStatus values={values}/>

                            <div className='flex flex-col md:flex-row'>

                                <div className='md:w-3/5'>

                                    <TextEditor handleSubmit={submitBlog} handleChange={handleChange} title={title} handleEditorChange={handleEditorChange} editorContent={editorContent} />

                                    
                                </div>

                                <div className='flex flex-col md:w-2/5 p-3'>

                                    {!cleared ?
                                        <Box className='p-3 flex justify-between' style={{backgroundColor: grey[700], borderRadius: '10px'}}>

                                            <div className='p-3'>
                                                <Typography variant='h3' className='font-bold' sx={{fontSize: '2rem', color: grey[50]}}>
                                                    {localStorageBlog.title}
                                                </Typography>                                
                                            </div>

                                            <div className='p-3 gap-6 flex'>
                                                <Button variant='contained' type='button' onClick={()=>handleSavedWork(true)}>
                                                    Continue Work
                                                </Button>
                                                <Button variant='outlined' onClick={handleLocalStorageClear}>
                                                    Clear Work
                                                </Button>
                                            </div>

                                        </Box>  
                                        : 
                                        <Box className='p-3 flex justify-between' style={{backgroundColor: grey[700], borderRadius: '10px'}}>

                                            <div className='p-3 w-full'>
                                                <Typography variant='h3' className='font-bold w-full text-center' sx={{fontSize: '3rem', color: grey[50]}}>
                                                    No Saved Work
                                                </Typography>                                
                                            </div>


                                        </Box>
                                    }



                                    <div className=' flex flex-col gap-3 py-3'>
                                        <TextField fullWidth value={photo} label='Photo' variant='outlined' onChange={handleChange('photo')} />
                                        <TextField multiline rows={3} fullWidth value={excerpt} label='Excerpt' variant='outlined' onChange={handleChange('excerpt')} />
                                    </div>

                                    <div className='flex gap-3'>
                                        <div className=' w-1/2'>
                                            <BlogCreateCategorySubcategory initSubcategories={initSubcategories} selected={selected} categories={categories} setSelected={setSelected} />
                                        </div>

                                        <div className=' w-1/2'>
                                                <Typography className='w-full text-center' variant='h6' sx={{fontSize: '1rem'}}>
                                                    Subcategories
                                                </Typography> 
                                            {
                                                subcategories.length > 0 &&
                                                <>
                                                    {subcategories.map((t:any, i:number) => (
                                                        <FormControlLabel  onChange={handleSubcategoryToggle(t._id)} key={t._id} control={<Checkbox size='small'  checked={checkedSubcategory.includes(t._id)} />} label={t.name} />
                                                    ))}                                        
                                                </>
                                            }
                                        </div>
                                        
                                        

                                    </div>

                                    <div>
                                        <Typography className='w-full text-center mt-3' variant='h6' sx={{fontSize: '1rem'}}>
                                            Tags
                                        </Typography> 
                                        <div className='flex  gap-1 items-center justify-center mb-3'>
                                            <TextField size="small" fullWidth value={tag} className='w-3/4' label="Tag" variant='outlined' onChange={(e)=> setTag(e.target.value)} />
                                            <div className='w-1/4'>
                                                <Button className='w-full'  variant='outlined' onClick={()=>handleAddTag(tag)} >
                                                    <AddCircleOutlineRoundedIcon />
                                                </Button>                                                
                                            </div>

                                        </div>
                                        {
                                            tags.length > 0 &&
                                            <div className='flex gap-3'>
                                            {tags.map((t, i) => {
                                                if(i % 2 === 0) {
                                                    return <Button  sx={{}} key={i}>
                                                    {t}
                                                </Button>
                                                } else {
                                                    return <Button  sx={{borderColor: grey[900], color: grey[900]}} key={i}>
                                                    {t}
                                                </Button>
                                                }
                                                
                                            })}
                                            </div>
                                        }

                                    </div>

                                </div>
                            </div>  

                        
                        <div className='md:w-3/5 flex flex-col justify-center items-center'>
                            <div className='py-6'>
                                <Typography variant='h3' sx={{color: grey[50]}} className='font-bold'>
                                    Post Preview 
                                </Typography>
                            </div>
                            <div className='w-full' style={{backgroundColor: "#FFF"}}>
                                {photo !== '' &&
                                    <div className='w-full my-3'>
                                        <CardMedia 
                                        className='h-[10vh]'
                                        sx={{objectFit: 'cover'}}
                                        component='img'
                                        src={photo}
                                        alt="Image"
                                        />
                                    </div>                            
                                }

                                <div className='p-6'>
                                    <div>
                                        <Typography variant='h3' sx={{}} className='text-center'>
                                            {title}
                                        </Typography>
                                    </div>
                                    <article>
                                            {editorContent && parse(editorContent)}
                                    </article>                            
                                </div>

                            </div>

                        </div>


                    </Layout>


                </Box>

            </>
        )
    }

    if(verified && session.role !== 24) {
        router.push(`/admin/dashboard/${session.user.username}`)
    }


}



export default Test;

Test.auth = true;