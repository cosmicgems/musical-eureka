import { Avatar, Box, Button, CardMedia, TextField, Typography } from '@mui/material';
import { grey, red } from '@mui/material/colors';
import React, { useState, useEffect } from 'react'
import moment from 'moment';
import axios from 'axios';
import { accMenuItems } from 'accountPageMenu'

interface Values {
    addressLineOne: string
    addressLineTwo: string
    city: string
    state: string
    zipCode: string
}

const DeliveryAddressForm = ({
    user, onUserDataUpdate
}) => {

    const {first_name, last_name, username, 
    email, about, photo, createdAt, address} = user;

    const [values, setValues] = useState<Values>({
        addressLineOne: address?.addressLineOne,
        addressLineTwo: address?.addressLineTwo,
        city: address?.city,
        state: address?.state,
        zipCode: address?.zipCode,
    })
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
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
        console.log(values);
        
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


            
        const modified_user = {
            values
        }
        console.log(modified_user);
        

        const res = await axios.put(`/api/auth/user/${user._id}`, {modified_user})
        console.log(res.data);

    }

    return (

            <div className='md:w-3/4 py-3 px-12 md:h-[59vh]'>
                <form className='flex flex-col py-3 gap-3 overflow-y-auto h-full' onSubmit={(e) => handleProfileUpdate(e)}>
                    <TextField name="addressLineOne" onChange={(e) => { handleChange(e) }} value={values.addressLineOne} label="Address Line One" />
                    <TextField name="addressLineTwo" onChange={(e) => { handleChange(e) }} value={values.addressLineTwo} label="Address Line Two" />
                    <TextField name="city"  onChange={(e) => { handleChange(e) }} value={values.city} label="City" />

                    
                    <TextField name="state"  onChange={(e) => { handleChange(e) }} value={values.state} label="State" />
                    <TextField name="zipCode" onChange={(e) => { handleChange(e) } }  value={values.zipCode} label="Zip-code" />
                    <Button type='submit' variant='contained' sx={{}} className='' >
                        Submit Changes
                    </Button>
                </form>
            </div>

        )
}

export default DeliveryAddressForm