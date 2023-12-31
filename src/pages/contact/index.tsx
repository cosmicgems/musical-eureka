import { CardMedia, Grid, Typography, Card, CardContent, Stack, TextField, Box, Button } from '@mui/material'
import Link from 'next/link'
import React from 'react'
import { motion } from 'framer-motion'
import { Facebook, Instagram, YouTube, Telegram } from '@mui/icons-material'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react'
import axios from 'axios'
import { useStateContext } from '../../../Context/StateContext'
import { blue, grey, lightBlue, green, lightGreen, deepPurple, orange, yellow, cyan, red } from '@mui/material/colors';
import { Layout } from '@components/big-three-components'


const theme = createTheme({
  components: {
    MuiInputLabel: {
      styleOverrides: {
        root: {
          '&$focused': {
            color: blue[200],
          },
          color: grey[900],
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '& fieldset': {
            borderColor: grey[800], // Replace this with your desired border color for default state
            transition: 'border-color 0.3s ease-in-out', // Add transition for smooth animation
          },
          '&:hover fieldset': {
            borderColor: blue[800], // Set border color to white on hover
          },
          '&$focused fieldset': {
            borderColor: 'white', // Set border color to white when focused
          },
          '& input': {
            color: grey[900],
          },
          '& textarea': {
            color: grey[900], // Set text color for multiline input
            '&::placeholder': {
              color: grey[900], // Set placeholder text color for multiline input
            },
          },
        },
      },
    },
  },
});





const ContactPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { pathSegment} = useStateContext();

  const pageSegmentColors = {
    technology: blue[100], 
    realty: yellow[100],
    health: lightBlue[100],
    intelligence: orange[100],
    community: deepPurple[100],
    finance: green[100], 
    art: cyan[100],
  };

  const indexFontColor = pageSegmentColors[pathSegment] || grey[900];

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')
  
  const handleSubmit = async (e) => { 
    e.preventDefault();
    setIsLoading(true);
    try {
      console.log(name, email, phone, message);
      await axios.post('/api/contact', { name, email, phone, message });
      setIsSuccess(true);
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
     
    } catch (error) {
      console.error('Error submitting form:', error);
     
    } 
    setIsLoading(false);
  }

  return (
    <Layout>
      <div style={{}}>      
              <CardContent sx={{ color: indexFontColor, bgcolor:'transparent',  minHeight: '100vh', paddingBlockStart: '13vh'}}>
        <Grid container spacing={0}  justifyContent='center' alignItems='center' sx={{  display: {xs:'flex', lg:'flex'}}}>


        <Grid item lg >
          
        <Typography   className='gradient-text-subcategories' component='div' variant='h1' sx={{width:'100%', textAlign:'center', fontWeight: 'bold', fontSize: {xs:'3rem', md: '6rem'}}}>Contact Us</Typography>
          <Typography className='gradient-text-subcategories' component='div' variant='body1' sx={{width: '100%', textAlign: 'center',marginBlockEnd: '5vh', fontSize: {md: '1.5rem'}}}>
            Curate a Lifestyle Worth Living.
          </Typography>  

        </Grid>
        <Grid item lg>
        <Typography className='gradient-text-subcategories' variant='h3' component='div' sx={{ width: '100%', textAlign: 'center', fontSize: {xs:'2rem'}}}> What&apos;s your question? </Typography>
        <Typography className='gradient-text-subcategories' variant='h6' component='div' sx={{ width:'100%', textAlign:'center'}}>pssst... we&apos;re happy to help!</Typography>
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
                <Button
                  type="submit"
                  variant="outlined"
                  size="large"
                  fullWidth
                  sx={{
                    padding: '1vh',
                    fontWeight: 'bold',
                    color: grey[900],
                    borderWidth: '3px',
                    cursor: isLoading || isSuccess ? 'not-allowed' : 'pointer',
                    pointerEvents: isLoading || isSuccess ? 'none' : 'auto',
                    borderColor: grey[900]
                  }}
                >
                  {isLoading ? 'Loading...' : isSuccess ? 'Form Submitted' : 'Get Your Answer!'}
                </Button>

              </div>
            </form>          
          </Box>
          
        </Grid>

                    




              </Grid>       
        </CardContent>
      </div>
    </Layout>

  )
}

export default ContactPage