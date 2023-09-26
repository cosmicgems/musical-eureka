import React, { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios';
import { Box, Button, CardMedia, Checkbox, FormControlLabel, FormGroup, TextField, Typography } from '@mui/material';
import { amber, green, grey, red } from '@mui/material/colors';
import { Editor } from '@tinymce/tinymce-react';
import parse from 'html-react-parser'

const ModifyPost = () => {

    const [post, setPost] = useState<any>({});    const [file, setFile] = useState(null);
    const [fileDataURL, setFileDataURL] = useState(null);
    const [title, setTitle] = useState<string>('');
    const [body, setBody] = useState<string>('');
    const [categories, setCategories] = useState<any>([]);
    const [subcategories, setSubcategories] = useState<any>([]);
    const [checked, setChecked] = useState<any>([]);
    const [checkedSubcategory, setCheckedSubcategory] = useState<any>([]);
    const [savedWork, setSavedWork] = useState<boolean>(null);
    const [editorContent, setEditorContent] = useState<string>('');
    const editorRef = useRef<any>(null);
    const [savedPost, setSavedPost] = useState<boolean>(null)
    const [cleared, setCleared] = useState<boolean>(false);
    const [localStorageBlog, setLocalStorageBlog] = useState<any>({})
    const [excerpt, setExcerpt] = useState<string>("");

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
    const { photo, success, successMessage, error, errorMessage, sending} = values;

    const router = useRouter();
    const { slug } = router.query;

    useEffect(()=> {
        if (slug) {
        const fetchPost = async () => {
            const res = await axios.get(`/api/blog/post/${slug}`);
            const post = res.data.post;
            setTitle(post.title);
            setEditorContent(post.body);
            setChecked(post.categories)
            setCheckedSubcategory(post.sub_categories)
            setValues({photo:post.photo})
            setExcerpt(post.excerpt)
            setPost(post);
        }
        fetchPost();
        }
    }, [slug, ])

    const showEditor = ()=> {
        return (        <form onSubmit={submitBlog}>

        
            <form className='p-3'>
                <div className='mb-3'>
                <TextField
                    fullWidth
                    variant='outlined'
                    sx={{}}
                    className=''
                    value={title}
                    label='title'
                    onChange={handleChange('title')} // Update title state on change
                />
                </div>
                <div className='py-3'>
                <Editor
                    onInit={(evt, editor) => {
                    editorRef.current = editor;
                    }}
                    init={{
                    height: 500,
                    menubar: false,
                    plugins: [
                        'advlist autolink lists link image charmap print preview anchor',
                        'searchreplace visualblocks code fullscreen',
                        'insertdatetime media table paste code help wordcount',
                    ],
                    toolbar:
                        'undo redo | formatselect | ' +
                        'bold italic backcolor | alignleft aligncenter ' +
                        'alignright alignjustify | bullist numlist outdent indent | ' +
                        'removeformat | help' + 'image | code |image' ,
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                    }}
                    onEditorChange={handleEditorChange} // Update editor content state on change
                    value={editorContent}
                />
                </div>
            </form>

            <div className='px-3'>
                <Button type='submit' variant='contained' >
                    Submit
                </Button>    
            </div>                             

        </form>)
    }

    
    const handleLocalStorageClear = () => {
        localStorage.removeItem("Title Update");
        localStorage.removeItem("Body Update");
        localStorage.removeItem("Photo Update");
        localStorage.removeItem("Categories Update");
        localStorage.removeItem("Subcategories Update");
        setTitle('');
        setEditorContent('');
        setValues({photo: ''});
        setChecked([]);
        setCheckedSubcategory([]);
        setCleared(true);
    }

    const handleEditorChange = (content: string) => {
        setEditorContent(content);
        localStorage.setItem("Body Update", content);
        setCleared(false);
    };

    const handleChange = (type: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        if (type === 'photo') {
            console.log(e.target.value);
            setValues({photo:e.target.value});
            localStorage.setItem('Photo Update', e.target.value)
            setCleared(false);
        } else if(type === 'title') {
            console.log(e.target.value);
            setTitle(e.target.value);
            localStorage.setItem('Title Update', e.target.value);
            setCleared(false);
        } else if(type === 'excerpt') {
            console.log(e.target.value);
            setExcerpt(e.target.value);
            localStorage.setItem('Excerpt', e.target.value);
        }
    };

    const submitBlog = async (e: any) => {
        setValues({ sending: true });
        e.preventDefault();
        try {
            const postData = { title, body: editorContent, categories:checked, sub_categories:checkedSubcategory, photo, id: post._id };
            console.log(postData);
            const post2 = await axios.put(`/api/blog/post/update/${slug}`, {postData});
            console.log(post2.data);
            setValues({
                sending: false,
                success: true,
                successMessage: post2.data.message,
            });
        } catch (error) {
            setValues({
                sending: false,
                success: false,
                error: true,
                errorMessage: `There was an error submitting ${title}, please try again.`,
            });
        }
    
        // // Clear success and error messages after a delay
        // setTimeout(() => {
        //     setValues((prevValues:any) => ({
        //         ...prevValues,
        //         success: null,
        //         error: null,
        //         successMessage: '',
        //         errorMessage: '',
        //     }));
        // handleLocalStorageClear();            
        // }, 3500);

    };
    
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
    
    useEffect(()=>{
        initCategories();
        initSubcategories();
    }, [])

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
        const allLocal = JSON.stringify(all)
        localStorage.setItem("Categories Update", allLocal)
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
        const allLocal = JSON.stringify(all)
        localStorage.setItem("Subcategories Update", allLocal)
    };
    const showCategories = () => {
        return (
            categories &&
                        
            <>
            {categories.map((c:any, i:number) => (
                <FormControlLabel onChange={handleToggle(c._id)} key={c._id} control={<Checkbox  checked={checked.includes(c._id)} />} label={c.name} />
            ))}
            </>
        );
    };

    const showSubcategories = () => {
        return (
            subcategories &&
            
            <>
            {subcategories.map((t:any, i:number) => (
                <FormControlLabel onChange={handleSubcategoryToggle(t._id)} key={t._id} control={<Checkbox  checked={checkedSubcategory.includes(t._id)} />} label={t.name} />
            ))}
            </>

        );
    };
    const handleSavedWork = (action:boolean) => {
        if(action){
            setSavedWork(action);
        } else if (!action){
            setSavedWork(action);
            localStorage.removeItem("Photo Update")
            localStorage.removeItem("Body Update")
            localStorage.removeItem("Title Update")
        }
    }
    
  // useEffect(()=>{
  //   setLocalStorageBlog({
  //       photo: localStorage.getItem('Photo Update'),
  //       title: localStorage.getItem('Title Update'),
  //       body: localStorage.getItem('Body Update'),
  //       categories: localStorage.getItem('Categories Update'),
  //       subcategories: localStorage.getItem('Subcategories Update'),
  //   })
  //   if(savedWork){
  //       if(localStorage.getItem("Photo Update") !== ''){
  //           setValues({photo: localStorage.getItem("Photo Update")});
  //       }
  //       if(localStorage.getItem("Body Update") !== ""){
  //           setBody(localStorage.getItem("Body Update"));
  //           setEditorContent(localStorage.getItem("Body Update"));
  //           setSavedPost(true);
  //       }
  //       if(localStorage.getItem("Title Update") !== "") {
  //           setTitle(localStorage.getItem("Title Update"));
  //       }
  //       if(localStorage.getItem("Category Update") !== "") {
  //           const parsedCategories = JSON.parse(localStorage.getItem("Categories Update"));
  //           setChecked(parsedCategories);
  //       }
  //       if(localStorage.getItem("Subcategory Update") !== "") {
  //           const parsedSubcategories = JSON.parse(localStorage.getItem("Subcategories Update"));
  //           setCheckedSubcategory(parsedSubcategories);
  //       }
  //       setSavedWork(false)
  //   }
  // })



    return (
        <Box sx={{bgcolor: grey[200]}} className='flex flex-col min-h-screen p-6'>
        { sending ?
            <Box className="p-3 mb-3" sx={{bgcolor: amber[600], borderRadius: "10px", fontSize: '2rem'}}>
                <Typography variant='h4' sx={{}} className=''>
                    Sending...
                </Typography>
            </Box>
            :
            success ?
            <Box sx={{bgcolor:green[400], borderRadius: "10px", fontSize: '2rem'}} className="p-3 mb-3">
                <Typography variant='h4' sx={{color:grey[50]}} className='font-bold'>
                    {successMessage}
                </Typography>
            </Box>   
            :
            error ?
            <Box sx={{bgcolor:red[700], borderRadius: "10px", fontSize: '2rem'}} className="p-3 mb-3">
                <Typography variant='h4' sx={{color: grey[200]}} className='font-bold'>
                    {errorMessage}
                </Typography>
            </Box> 
            :
            <div className='w-full p-3 mb-3'>
                <Typography variant="h3" className=' w-full text-center' sx={{color: green[500]}}>
                    {title} <Typography variant='h3' className='inline-block font-bold' sx={{color: amber[500]}}> Update</Typography> 
                </Typography>
            </div>
        }



        <div className='flex gap-12'>

            <div className='sm:w-3/5'>

                    <div>
                    {showEditor()} 
                    </div>
            </div>

            
            <div className='flex flex-col sm:w-2/5 '>
    {/*           
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
    */}



            <div className='p-3 flex flex-col gap-3'>
                <TextField fullWidth value={photo} label='Photo' variant='outlined' onChange={handleChange('photo')} />
                <TextField fullWidth value={excerpt} label='Excerpt' variant='outlined' onChange={handleChange('excerpt')} />
            </div>

            <div className='flex '>

                <div className='p-3 w-1/2'>
                    <div>
                        <Typography variant='h6' sx={{}}>
                            Categories
                        </Typography>                                
                    </div>
                    <FormGroup>
                        {showCategories()}                   
                    </FormGroup>


                </div>

                <div className='p-3 w-1/2'>
                    <div>
                        <Typography variant='h6' sx={{}}>
                            Subcategories
                        </Typography>                                
                    </div>
                    <FormGroup>
                        {showSubcategories()}                
                    </FormGroup>                 
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
        </Box>
    )
}

export default ModifyPost