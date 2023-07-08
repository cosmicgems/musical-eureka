import { CardMedia, Grid, Typography, Card, CardContent, Stack, TextField, Box, Button } from '@mui/material'
import Link from 'next/link'
import React from 'react'
import { motion } from 'framer-motion'
import { blue, grey, red } from '@mui/material/colors'
import { Facebook, Instagram, YouTube, Telegram } from '@mui/icons-material'



const ContactPage = () => {
  return (
    <div className=''>      
            <CardContent sx={{ color: blue[600],  minHeight: '100vh', paddingBlockStart: '13vh'}}>
        <Typography component='div' variant='h1' sx={{width:'100vw', textAlign:'center',}}>Contact Us</Typography>
        <Typography component='div' variant='p' sx={{width: '100vw', textAlign: 'center',marginBlockEnd: '5vh'}}>
          Curate a Lifestyle Worth Living.
        </Typography>  
      <Grid container spacing={0}  justifyContent='center' alignItems='center' sx={{ bgcolor: grey[900], color: red[900], display: {xs:'none', lg:'flex'}}}>


      <Grid item lg >
        <Stack direction='row' justifyContent='center' alignContent='center' spacing={4}>
          <motion.div 
          whileHover={{ scale: 2 }}
          whileTap={{ scale: 6 }}>
            <Facebook sx={{fontSize: 100}}/>
          </motion.div>
          <motion.div 
          whileHover={{ scale: 2 }}
          whileTap={{ scale: 6 }}>
            <Instagram sx={{fontSize: 100}}/>
          </motion.div>
          <motion.div 
          whileHover={{ scale: 2 }}
          whileTap={{ scale: 6 }}>
            <YouTube sx={{fontSize: 100}}/>
          </motion.div>
          <motion.div 
          whileHover={{ scale: 2 }}
          whileTap={{ scale: 6 }}>
            <Telegram  sx={{fontSize: 100}}/>
          </motion.div>
             
        </Stack>
      </Grid>
      <Grid item lg>
      <Typography variant='h3' component='div' sx={{ width: '100%', textAlign: 'center'}}> What's your question? </Typography>
      <Typography variant='h6' component='div' sx={{ width:'100%', textAlign:'center'}}>pssst... we're happy to help!</Typography>
        <Box sx={{paddingInline: '30%'}}>
          
          <form className='my-5' s >
            <Grid container spacing={0} sx={{}}>
              <Grid item xs={12} sx={{marginBlockEnd: '2vh'}}>
                <TextField label='Name' fullWidth variant='outlined' />
              </Grid>
              <Grid item xs={12} sx={{marginBlockEnd: '2vh'}}>
                <TextField label='Email' fullWidth variant='outlined' />
              </Grid>
              <Grid item xs={12} sx={{marginBlockEnd: '2vh'}}>
                <TextField label='Phone' fullWidth variant='outlined' />
              </Grid>
              <Grid item xs={12} sx={{marginBlockEnd: '2vh'}}>
                <TextField multiline rows={4} label='Message' fullWidth variant='outlined' />
              </Grid>
            </Grid>
            <div style={{width: '100%'}}>
              <Button type='submit' variant='outlined' size='large' fullWidth sx={{padding: '1vh'}}>
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