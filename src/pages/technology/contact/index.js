import { CardMedia, Grid, Typography, Card, CardContent, Stack, TextField, Box, Button } from '@mui/material'
import Link from 'next/link'
import React from 'react'
import { motion } from 'framer-motion'
import { blue, grey, red } from '@mui/material/colors'
import { Facebook, Instagram, YouTube, Telegram } from '@mui/icons-material'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react'
import axios from 'axios'


const theme = createTheme({
  components: {
    MuiInputLabel: {
      styleOverrides: {
        root: {
          '&$focused': {
            color: 'blue',
          },
          color: 'white',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '& fieldset': {
            borderColor: 'white', // Replace this with your desired border color for default state
            transition: 'border-color 0.3s ease-in-out', // Add transition for smooth animation
          },
          '&:hover fieldset': {
            borderColor: '#EEE', // Set border color to white on hover
          },
          '&$focused fieldset': {
            borderColor: 'white', // Set border color to white when focused
          },
          '& input': {
            color: 'white',
          },
          '& textarea': {
            color: 'white', // Set text color for multiline input
            '&::placeholder': {
              color: 'white', // Set placeholder text color for multiline input
            },
          },
        },
      },
    },
  },
  mixins: {
    '@keyframes gradientAnimation': {
      '0%': {
        backgroundPosition: '0% 50%',
      },
      '50%': {
        backgroundPosition: '100% 50%',
      },
      '100%': {
        backgroundPosition: '0% 50%',
      },
    },
  },
});





const ContactPage = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')
  
  const handleSubmit = async (e) => { 
    e.preventDefault();
    try {
      console.log(name, email, phone, message);
      await axios.post('/api/contact', { name, email, phone, message });
      console.log('Form submitted successfully!');
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
      // Add any further actions you want to perform after successful form submission
    } catch (error) {
      console.error('Error submitting form:', error);
      // Handle error and display appropriate message to the user
    }
  }
  return (
    <div style={{}}>      
            <CardContent sx={{ color: blue[600], bgcolor:grey[700],  minHeight: '100vh', paddingBlockStart: '13vh'}}>
        <Typography component='div' variant='h1' sx={{width:'100%', textAlign:'center', fontWeight: 'bold', fontSize: {xs:'3rem', md: '6rem'}}}>Contact Us</Typography>
        <Typography component='div' variant='p' sx={{width: '100%', textAlign: 'center',marginBlockEnd: '5vh', fontSize: {md: '1.5rem'}}}>
          Curate a Lifestyle Worth Living.
        </Typography>  
      <Grid container spacing={0}  justifyContent='center' alignItems='center' sx={{  display: {xs:'flex', lg:'flex'}}}>


      <Grid item lg >
        <Stack direction='row' justifyContent='center' alignContent='center' spacing={4} className='mb-3'>
          <motion.div 
          whileHover={{ scale: 2 }}
          whileTap={{ scale: 6 }}>
            <Facebook sx={{fontSize: {xs:50, md:100}}}/>
          </motion.div>
          <motion.div 
          whileHover={{ scale: 2 }}
          whileTap={{ scale: 6 }}>
            <Instagram sx={{fontSize: {xs:50, md:100}}}/>
          </motion.div>
          <motion.div 
          whileHover={{ scale: 2 }}
          whileTap={{ scale: 6 }}>
            <YouTube sx={{fontSize: {xs:50, md:100}}}/>
          </motion.div>
          <motion.div 
          whileHover={{ scale: 2 }}
          whileTap={{ scale: 6 }}>
            <Telegram  sx={{fontSize: {xs:50, md:100}}}/>
          </motion.div>
             
        </Stack>
      </Grid>
      <Grid item lg>
      <Typography variant='h3' component='div' sx={{ width: '100%', textAlign: 'center', fontSize: {xs:'2rem'}}}> What&apos;s your question? </Typography>
      <Typography variant='h6' component='div' sx={{ width:'100%', textAlign:'center'}}>pssst... we&apos;re happy to help!</Typography>
        <Box sx={{paddingInline: {xs:'6%',md:'30%'}}}>
          
          <form className='my-5' onSubmit={handleSubmit} >
            <Grid container spacing={0} sx={{}}>
              <Grid item xs={12} sx={{marginBlockEnd: '2vh'}}>
              <ThemeProvider theme={theme}>
                  <TextField value={name} onChange={(e)=> setName(e.target.value)} label='Name' fullWidth variant='outlined' />                  
                </ThemeProvider>

              </Grid>
              <Grid item xs={12} sx={{marginBlockEnd: '2vh'}}>
              <ThemeProvider theme={theme}>
                <TextField value={email} onChange={(e)=> setEmail(e.target.value)} label='Email' fullWidth variant='outlined' />                
              </ThemeProvider>
              </Grid>
              <Grid item xs={12} sx={{marginBlockEnd: '2vh'}}>
              
              <ThemeProvider theme={theme}>
                <TextField value={phone} onChange={(e)=> setPhone(e.target.value)} label='Phone' fullWidth variant='outlined' />                
              </ThemeProvider>

              </Grid>
              <Grid item xs={12} sx={{marginBlockEnd: '2vh'}}>
              
              <ThemeProvider theme={theme}>
                <TextField value={message} onChange={(e)=> setMessage(e.target.value)} multiline rows={4} label='Message' fullWidth variant='outlined' />                
              </ThemeProvider>

              </Grid>
            </Grid>
            <div style={{width: '100%'}}>
              <Button type='submit' variant='outlined' size='large' fullWidth sx={{padding: '1vh', fontWeight: 'bold', color: grey[50], borderWidth: '3px'}}>
                Get Your Answer!
              </Button>

            </div>
          </form>          
        </Box>
        
      </Grid>

                  




            </Grid>       
      </CardContent>
    </div>
  )
}

export default ContactPage