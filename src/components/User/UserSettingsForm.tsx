import { Avatar, Box, Button, CardMedia, TextField, Typography } from '@mui/material';
import { grey, red } from '@mui/material/colors';
import React, { useState, useEffect } from 'react'
import moment from 'moment';
import axios from 'axios';

const UserSettingsForm = ({user, onUserDataUpdate}) => {
    console.log(user);

    const {first_name, last_name, username, 
    email, about, photo, createdAt} = user;

    
    const [firstNameUpdate, setFirstNameUpdate] = useState<string>(first_name);
    const [lastNameUpdate, setLastNameUpdate] = useState<string>(last_name);
    const [emailUpdate, setEmailUpdate] = useState<string>(email);
    const [usernameUpdate, setUsernameUpdate] = useState<string>(username);
    const [passwordUpdate, setPasswordUpdate] = useState<string>("");
    const [photoUpdate, setPhotoUpdate] = useState<string>(photo);
    const [photoFileData, setPhotoFileData] = useState<any>();
    const [photoPreview, setPhotoPreview] = useState<any>();
    const [aboutUpdate, setAboutUpdate] = useState<string>(about);
    const [photoString, setPhotoString] = useState<boolean>(null);
    const [photoFile, setPhotoFile] = useState<boolean>(null);



    const handleChange = (e:any) =>{
        setPhotoUpdate("");
        setPhotoFile(true)
        const value = e.target.files[0] 
        
        const file = value
        const imgUrl = URL.createObjectURL(file);
        setPhotoPreview(imgUrl);
        setPhotoFileData(file);
        console.log(imgUrl);

        
        onUserDataUpdate({
            first_name: firstNameUpdate,
            last_name: lastNameUpdate,
            username: usernameUpdate,
            email: emailUpdate,
            about: aboutUpdate,
            photo_string: photoUpdate,
            photo_file: e.target.value,
        });
        
    };

    useEffect(() => {
        if(photoUpdate === ""){
            setPhotoString(false);
        } else if ( photoUpdate !== ""){
            setPhotoString(true);
        }
    }, [photoUpdate])

    useEffect(() => {
        if(photoFileData === ""){
            setPhotoFile(false);
        }
    }, [photoFileData])

    const handleProfileUpdate = async (e) => {
        e.preventDefault()

        if(photoFileData) {
            
            const form = e.currentTarget;
            const fileInput = Array.from(form.elements).find(({ name }) => name === 'file') as HTMLInputElement | undefined;
            
            let formData = new FormData();

            
            
            formData.append("file", fileInput.files[0])
            formData.set('upload_preset', 'user_photo_update');


            
            const photo = await fetch('https://api.cloudinary.com/v1_1/dyfhsjtwo/image/upload', {
                method: 'POST',
                body: formData
            }).then((r)=> r.json())

            const photo_url = photo.secure_url;
            
            const modified_user = {
                first_name: firstNameUpdate,
                last_name: lastNameUpdate,
                about: aboutUpdate,
                photo: photo_url
            }

            const res = await axios.put(`/api/auth/user/${user._id}`, {modified_user})
            console.log(res.data);
        } else if (photoString) {
            
            const modified_user = {
                first_name: firstNameUpdate,
                last_name: lastNameUpdate,
                about: aboutUpdate,
                photo: photoUpdate
            }

            const res = await axios.put(`/api/auth/user/${user._id}`, {modified_user})
            console.log(res.data);
        }



        
    }

  return (
    <div className='flex gap-3'>
        <div className='sm:w-1/3 p-3 flex flex-col gap-3'>
            <Typography variant='h3' sx={{}} className='gradient-text-subcategories'>
                Profile Preview
            </Typography>
            <Box className="flex flex-col gap-3" sx={{bgcolor: grey[900], borderRadius: '5px', p:3}}>
                <div className='flex gap-3'>
                    {
                        photoString ? 
                        <CardMedia
                        component="img"
                        image={photoUpdate}
                        alt=''
                        sx={{borderRadius: '5px'}}
                        className='w-[150px] h-[150px]'
                        /> 
                        : photoFile ?
                        <CardMedia
                        component="img"
                        src={photoPreview}
                        alt=''
                        sx={{borderRadius: '5px'}}
                        className='w-[150px] h-[150px]'
                        />
                        :
                        <Avatar variant='square' sx={{borderTopLeftRadius: '5px', borderBottomLeftRadius: "5px"}} className='h-[125px] w-[125px]'> <Typography  className='gradient-text-subcategories' variant='h2'>{firstNameUpdate[0]}</Typography> </Avatar>
                    }       

                    <div className='flex flex-col gap-2'>
                        <div className='flex gap-1'>
                            <Typography variant='body1' className='gradient-text-category' sx={{fontSize: "1.25rem"}}>
                                Username:
                            </Typography> 

                            <Typography variant='body1' className='' sx={{fontSize: "1.25rem",color:grey[50]}}>
                                {usernameUpdate}
                            </Typography> 
                        </div>
                        <div className='flex gap-1'>
                            <Typography variant='body1' className='gradient-text-category' sx={{fontSize: "1.25rem"}}>
                                Member Since:
                            </Typography> 

                            <Typography variant='body1' className='' sx={{fontSize: "1.25rem",color:grey[50]}}>
                                {moment(createdAt).fromNow()}
                            </Typography> 
                        </div>
                        
                    </div>
            
                
                </div>

                <div className='flex gap-1'>
                    <Typography variant='body1' className='gradient-text-category' sx={{fontSize: "1.25rem",}}>
                        Name:
                    </Typography> 

                    <Typography variant='body1' className='' sx={{fontSize: "1.25rem",color:grey[50]}}>
                        {firstNameUpdate} {lastNameUpdate}
                    </Typography> 
                </div>

                <div className='flex gap-1'>
                    <Typography variant='body1' className='gradient-text-category' sx={{fontSize: "1.25rem",}}>
                        Email:
                    </Typography> 

                    <Typography variant='body1' className='' sx={{fontSize: "1.25rem",color:grey[50]}}>
                        {emailUpdate}
                    </Typography> 
                </div>

                

                <div className='flex flex-col gap-1  '>
                    <Typography variant='body1' sx={{fontSize: '1.25rem'}} className='gradient-text-category '>
                        Bio:
                    </Typography>
                    <Typography variant='body1' className='' sx={{color:grey[50], textAlign: 'left'}}>
                        {aboutUpdate}
                    </Typography>
                </div>                
            </Box>



        </div>

        <div className='sm:w-1/2 p-3'>
            <form className='flex flex-col gap-3' onSubmit={(e) => handleProfileUpdate(e)}>
                <Typography variant='h3' sx={{}} className='gradient-text-subcategories'>
                    Settings
                </Typography>
                <TextField onChange={(e) => { setFirstNameUpdate(e.target.value);  onUserDataUpdate({ first_name: firstNameUpdate, last_name: lastNameUpdate, username: usernameUpdate, email: emailUpdate, about:aboutUpdate, photoString, photoFile}) }} value={firstNameUpdate} label="First Name" />
                <TextField onChange={(e) => { setLastNameUpdate(e.target.value); onUserDataUpdate({ first_name: firstNameUpdate, last_name: lastNameUpdate, username: usernameUpdate, email: emailUpdate, about:aboutUpdate, photoString, photoFile}) }} value={lastNameUpdate} label="Last Name" />
                <TextField disabled onChange={(e) => { setUsernameUpdate(e.target.value);  onUserDataUpdate({ first_name: firstNameUpdate, last_name: lastNameUpdate, username: usernameUpdate, email: emailUpdate, about:aboutUpdate, photoString, photoFile}) }} value={usernameUpdate} label="Username" />
                <div className='flex flex-row gap-1' >
                    {  photoString ?
                        <>
                            <TextField className='w-3/4' onChange={(e) => { setPhotoUpdate(e.target.value); onUserDataUpdate({ first_name: firstNameUpdate, last_name: lastNameUpdate, username: usernameUpdate, email: emailUpdate, about:aboutUpdate, photoString, photoFile}) }} value={photoUpdate} label="Photo" />
                            <Button onClick={()=>{ setPhotoUpdate("")}} variant='contained' size='small'sx={{bgcolor:red[900]}}>
                                Clear
                            </Button>    
                            <Button className='w-1/4' fullWidth variant='contained' size="small" disabled>
                                <label>
                                    <Typography variant="body1" sx={{fontSize:'.75em'}} component='div'> Upload</Typography>
                                <input onChange={(e)=> handleChange(e)} type='file' accept="image/*" name='photo-file'  hidden/>
                                </label>
                            </Button>             
                        </>
                        : photoFile ?
                        <>
                            <TextField className='w-1/4' disabled onChange={(e) => { setPhotoUpdate(e.target.value); onUserDataUpdate({ first_name: firstNameUpdate, last_name: lastNameUpdate, username: usernameUpdate, email: emailUpdate, about:aboutUpdate, photoString, photoFile}) }} value={photoUpdate} label="Photo" />
                            <Button fullWidth className='p-0' variant='contained' size="small" >
                                <label className='h-full w-full flex justify-center items-center' htmlFor='file-input' >
                                    Upload
                                    <input  id="file-input" onChange={(e)=> handleChange(e)} type='file' accept="image/*" name='file'  hidden/>
                                </label>
                            </Button>
                            <Button onClick={()=>{ setPhotoFileData({}); setPhotoPreview({}); setPhotoFile(!photoFile)}} variant='contained' size='small'sx={{bgcolor:red[900]}}>
                                Clear
                            </Button>                         
                        </>
                        :
                        <>
                            <TextField className='w-1/2' onChange={(e) => { setPhotoUpdate(e.target.value); setPhotoString(true); onUserDataUpdate({ first_name: firstNameUpdate, last_name: lastNameUpdate, username: usernameUpdate, email: emailUpdate, about:aboutUpdate, photoString, photoFile}) }} value={photoUpdate} label="Photo" />
                            <Button fullWidth className='p-0' variant='contained' size="small" >
                                <label className='h-full w-full flex justify-center items-center' htmlFor='file-input' >
                                    <Typography variant="body1" sx={{fontSize:'.75em'}} component='div'> Upload</Typography>
                                    <input id="file-input" onChange={(e)=> handleChange(e)} type='file' accept="image/*" name="file"  hidden/>
                                </label>
                            </Button>                    
                        </>
                    }
                    
                    
                    

                </div>
                
                <TextField disabled onChange={(e) => setEmailUpdate(e.target.value)} value={emailUpdate} label="Email" />
                <TextField onChange={(e) => setAboutUpdate(e.target.value)} multiline rows={3} value={aboutUpdate} label="Bio" />
                <Button type='submit' variant='contained' sx={{}} className='' >
                    Submit Changes
                </Button>
            </form>
        </div>

    </div>
  )
}

export default UserSettingsForm