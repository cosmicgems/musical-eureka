import { Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import { alpha, styled } from '@mui/material/styles';
import { green, grey } from '@mui/material/colors';


const CssTextField = styled(TextField)({
    '& label.Mui-focused': {
    color: green[200],
    },
    '& .MuiInput-underline:after': {
    borderBottomColor: '#B2BAC2',
    },
    '& .MuiOutlinedInput-root': {
    '& fieldset': {
        borderColor: grey[50],
    },
    '&:hover fieldset': {
        borderColor: grey[50],
    },
    '&.Mui-focused fieldset': {
        borderColor: grey[50],
    },
    '& .MuiInputBase-input': { 
        color: grey[50], 
    },
    },
    '& label': { 
        color: grey[50], 
    },
});

const AdContactForm = ({submitForm}) => {

    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [company, setCompany] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [message, setMessage] = useState<string>("");

    const form = {
        first_name:firstName,
        last_name:lastName,
        company,
        email,
        phone,
        message
    }

    const handleSubmit = async (e) => {
        console.log(form)
        submitForm(e,form)

    }

  return (
    <div>
        <form onSubmit={(e)=>{handleSubmit(e)}} className='flex flex-col gap-3'>
            <div className='flex gap-2 mb-3'>
                <CssTextField sx={{}} label="First Name" value={firstName} variant='outlined' onChange={(e)=>{setFirstName(e.target.value)}} />
                <CssTextField sx={{}} label="Last Name" value={lastName} variant='outlined' onChange={(e)=>{setLastName(e.target.value)}} />
            </div>
            <div className='flex gap-2'>
                <CssTextField fullWidth sx={{}} label="Company" value={company} variant='outlined' onChange={(e)=>{setCompany(e.target.value)}} />
            </div>
            <div className='flex gap-2 mb-3'>
                <CssTextField sx={{}} label="Email" value={email} variant='outlined' onChange={(e)=>{setEmail(e.target.value)}} />
                <CssTextField sx={{}} label="Phone" value={phone} variant='outlined' onChange={(e)=>{setPhone(e.target.value)}} />
            </div>
            <div className='flex gap-2'>
                <CssTextField fullWidth multiline rows={3} sx={{}} label="Message" value={message} variant='outlined' onChange={(e)=>{setMessage(e.target.value)}} />
            </div>
            <div className='flex'>
                <Button type='submit' fullWidth sx={{color:grey[900]}} className='gradient-button-signup'>
                    Submit
                </Button>
            </div>
        </form>
    </div>
  )
}

export default AdContactForm