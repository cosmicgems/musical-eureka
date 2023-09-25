import React, { useRef, useState, useEffect, useCallback } from 'react';
import RichTextEditor from '../../../../../components/Text Editor/RichTextEditor';
import { Box, Button, CardContent, CardMedia, Checkbox, FormControl, FormControlLabel, FormGroup, TextField, Typography } from '@mui/material';
import { amber, green, grey, red } from '@mui/material/colors';
import { useRouter } from 'next/router';
import axios from 'axios';
import parse from 'html-react-parser'
import { Editor } from '@tinymce/tinymce-react';
import { getSession } from 'next-auth/react';

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
    const [savedWork, setSavedWork] = useState<boolean>(null);
    const [editorContent, setEditorContent] = useState<string>('');
    const editorRef = useRef<any>(null);
    const [savedPost, setSavedPost] = useState<boolean>(null)
    const [cleared, setCleared] = useState<boolean>(false);
    const [user, setUser] = useState<any>({});

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

    const { photo, success, successMessage, error, errorMessage, sending} = values;

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
        const allLocal = JSON.stringify(all)
        localStorage.setItem("Categories", allLocal)
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

    useEffect(()=>{
        initCategories();
        initSubcategories();
    }, [])

    useEffect(()=>{
        setLocalStorageBlog({
            photo: localStorage.getItem('Photo'),
            title: localStorage.getItem('Title'),
            body: localStorage.getItem('Title'),
            categories: localStorage.getItem('Categories'),
            subcategories: localStorage.getItem('Subcategories'),
        })
        if(savedWork){
            if(localStorage.getItem("Photo") !== ''){
                setValues({photo: localStorage.getItem("Photo")});
            }
            if(localStorage.getItem("Body") !== ""){
                setBody(localStorage.getItem("Body"));
                setEditorContent(localStorage.getItem("Body"));
                setSavedPost(true);
            }
            if(localStorage.getItem("Title") !== "") {
                setTitle(localStorage.getItem("Title"));
            }
            if(localStorage.getItem("Category") !== "") {
                const parsedCategories = JSON.parse(localStorage.getItem("Categories"));
                setChecked(parsedCategories);
            }
            if(localStorage.getItem("Subcategory") !== "") {
                const parsedSubcategories = JSON.parse(localStorage.getItem("Subcategories"));
                setCheckedSubcategory(parsedSubcategories);
            }
            setSavedWork(false)
        }
    })

    const submitBlog = async (e: any) => {
        setValues({ sending: true });
        e.preventDefault();
        try {
            const postData = { title, body: editorContent, checked, checkedSubcategory, photo, user };
            console.log(postData);
            const post = await axios.post("/api/blog/post/create", postData);
            console.log(post.data);
            setValues({
                sending: false,
                success: true,
                successMessage: post.data.message,
            });
        } catch (error) {
            setValues({
                sending: false,
                success: false,
                error: true,
                errorMessage: `There was an error submitting ${title}, please try again.`,
            });
        }
    
        // Clear success and error messages after a delay
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

    const handleEditorChange = (content: string) => {
        setEditorContent(content);
        localStorage.setItem("Body", content);
        setCleared(false);
    };
    
    const handleChange = (type: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        if (type === 'photo') {
            console.log(e.target.value);
            setValues({photo:e.target.value});
            localStorage.setItem('Photo', e.target.value)
            setCleared(false);
        } else if(type === 'title') {
            console.log(e.target.value);
            setTitle(e.target.value);
            localStorage.setItem('Title', e.target.value);
            setCleared(false);
        }
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
        setCheckedSubcategory([]);
        setCleared(true);
    }


    useEffect(()=>{
        const checkSession = async () => {
            try {
                const session = await getSession();
                if (session) {
                    const userId = (session.user as { id: string }).id;
                    if (userId !== user) {
                        setUser(userId);
                    }
                }
            } catch (error) {
                console.error("Error fetching session:", error);
            }
        };

        checkSession();
        // console.log(user);
        
    }, [user])

    return (
        <>

            <Box className='min-h-screen p-6 flex flex-col' sx={{bgcolor: grey[200]}} >
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
                        <Typography variant="h3" className='font-bold w-full text-center' sx={{color: green[500]}}>
                            Create A Post
                        </Typography>
                    </div>
                }



                <div className='flex '>

                    <div className='sm:w-3/5'>

                        <form onSubmit={submitBlog}>

                            {/* <RichTextEditor onPropsChange={handleReceivedProps}/>         */}
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

                        </form>

                        
                    </div>

                    <div className='flex flex-col sm:w-2/5 p-3'>

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



                        <div className='p-3'>
                            <TextField fullWidth value={photo} label='photo' variant='outlined' onChange={handleChange('photo')} />
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

        </>
    );
}

Test.auth = true;

export default Test;