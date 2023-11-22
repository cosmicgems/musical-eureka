import React, { useState } from 'react'
import { styled } from '@mui/material/styles';
import { Button, TextField, Typography } from '@mui/material';
import { green, grey } from '@mui/material/colors';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

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
    '& label': { // Add this selector for unfocused label
        color: grey[50], // Change this to the desired label color
    },
});


const ShippingComponent = ({handleNext}) => {

    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [suffix, setSuffix] = useState<string>("");
    const [addressLineOne, setAddressLineOne] = useState<string>("");
    const [addressLineTwo, setAddressLineTwo] = useState<string>("");
    const [city, setCity] = useState<string>("");
    const [state, setState] = useState<string>("");
    const [zip, setZip] = useState<string>("");

  return (
    <div className='flex flex-col gap-3 p-3'>
        <div className='flex gap-1 items-center'>
            <LocalShippingIcon sx={{color: grey[50]}} />
            <Typography variant="h5" component="div" className='gradient-text'>
                Shipping Info
            </Typography>
        </div>
        <div className='flex gap-3'>
            <CssTextField className='w-2/5' value={firstName} label="First Name" onChange={(e)=>{setFirstName(e.target.value)}} />
            <CssTextField className='w-2/5' value={lastName} label="Last Name" onChange={(e)=>{setLastName(e.target.value)}} />
            <CssTextField className='w-1/5' value={suffix} label="Suffix" onChange={(e)=>{setSuffix(e.target.value)}} />
        </div>
        <div className='flex flex-col gap-3'>
            <CssTextField value={addressLineOne} label="Address Line One" onChange={(e)=>{setAddressLineOne(e.target.value)}} />
            <CssTextField value={addressLineTwo} label="Address Line Two" onChange={(e)=>{setAddressLineTwo(e.target.value)}} />
        </div>
        <div className='flex gap-3'>
            <CssTextField value={city} label="City" onChange={(e)=>{setCity(e.target.value)}} />
            <CssTextField value={state} label="State" onChange={(e)=>{setState(e.target.value)}} />
            <CssTextField value={zip} label="Zipcode" onChange={(e)=>{setZip(e.target.value)}} />
        </div>

        <Button onClick={handleNext} variant='outlined'>
            Next
        </Button>

    </div>
  )
}

export default ShippingComponent