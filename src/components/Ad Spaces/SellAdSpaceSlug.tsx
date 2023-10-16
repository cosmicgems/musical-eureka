import { Box, Button, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import React, { useState } from 'react'
import AdContactForm from './Ad Components/AdContactForm';
import axios from 'axios';
import AlertComponent from './Ad Components/AlertComponent';

const SellAdSpaceSlug = () => {
  const [contact, setContact] = useState<boolean>(false);
  const [values, setValues] = useState<any>({
    sending: null,
    success: null,
    successMessage: "",
    error: null,
    errorMessage: "",
  });
  const [form, setForm] = useState<any>({});
  
  const handleSubmitForm = async (e,formData) => {
    e.preventDefault();
    console.log(formData);
    setContact(false);
    setValues({sending:true});
    try {
      const res = await axios.post('/api/ad-forms/slug-page', {formData});

      console.log(res.data.form);
      
      
      setTimeout(() => {
        setValues({
          sending:false,
          success: true,
          successMessage: `Message sent successfully. We look forward to working with a company like ${formData.company}. We'll Be in touch.`
        })
      }, 500);

    } catch (error) {
      console.error(error);
            
      setTimeout(() => {
        setValues({
          sending:false,
          error: true,
          errorMessage: `There was an error sending the message. Please feel free to try again.`
        });
      }, 500);

      setTimeout(() => {
        setValues({
          ...values,
          error: false,
          errorMessage: ``
        });
        setContact(true);
      }, 2500);
      return
    }
      
    setTimeout(() => {
      setValues({
        sending:false,
        error: false,
        errorMessage: "",
        success: false,
        successMessage: ""
      });
    }, 5000);

  };

  const alertData = {
    values
  }

  return (
    <Box sx={{bgcolor: grey[900], borderRadius: "5px"}} className="">

      <div className='flex flex-col gap-3 justify-center items-center px-3 py-6'>

        <Typography variant='h3' className='gradient-text-two' sx={{}}>
          Small Business?
        </Typography>

        {
          contact ? 
          <AdContactForm submitForm={handleSubmitForm} />
          :
          values.sending ?
          <AlertComponent data={alertData} />
          :
          values.success ?
          <AlertComponent data={alertData} />
          :
          values.error ?
          <AlertComponent data={alertData} />
          :
          <div className='flex flex-col gap-3'>
            <Typography variant='body1' className='' sx={{color:grey[50]}}>
              Find out how your business can join the Pearl Box Network.
            </Typography> 
            <Button sx={{color:grey[900], fontSize: '1.1rem'}} className='gradient-button-signup ' onClick={()=>{setContact(!contact)}}>
              Become a Curated Company with Pearl Box
            </Button>             
          </div>
        }


      </div>

    </Box>
  )
}

export default SellAdSpaceSlug