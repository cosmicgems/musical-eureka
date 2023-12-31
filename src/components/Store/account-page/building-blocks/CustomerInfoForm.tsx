import { Avatar, Box, Button, CardMedia, TextField, Typography } from '@mui/material';
import { grey, red } from '@mui/material/colors';
import React, { useState, useEffect } from 'react'
import moment from 'moment';
import axios from 'axios';

const CustomerInfoForm = ({user, onUserDataUpdate}) => {
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

            <div className='md:w-3/4 py-3 px-12  md:h-[59vh]'>
                <form className='flex flex-col py-3 gap-3 overflow-y-auto h-full' onSubmit={(e) => handleProfileUpdate(e)}>
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

        )
}

export default CustomerInfoForm