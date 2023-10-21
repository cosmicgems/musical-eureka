import theme from '@/styles/theme/lightThemeOptions'
import { Box, Button, Checkbox, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, TextField, Typography } from '@mui/material'
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import { grey } from '@mui/material/colors';
import React, { useState } from 'react';
import { states } from '@/assets/states';
import axios from 'axios';

const FreeCreditReportConsultation = () => {

  const [freeConsultation, setFreeConsultation] = useState<any>({
    firstName: "",
    lastName: "",
    email: "",
  })
  const [phone, setPhone] = useState<any>({
    sequence_one: "",
    sequence_two: "",
    sequence_three: "",
  });
  const [address, setAddress] = useState<any>({
      line_one: "",
      line_two: "",
      city: "",
      state: [],
      zip: "",
  });

  const {firstName, lastName, email} = freeConsultation;


  
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
  PaperProps: {
      style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
      },
  },
  };

  const handleSubmit = async(e:any) => {

    const form = {
      firstName,
      lastName, 
      email,
      phone,
      address
    }
    e.preventDefault();
    console.log(form);
    
    const consultation = await axios.post("/api/consultation/free-consultation", {form})
    console.log(consultation.data.message);
    
  }

  return (
    <Box sx={{}} className=''>
      <div className='min-h-screen' style={{padding: theme.spacing(3),}}>

        <div style={{marginBlockEnd: theme.spacing(1)}}>
          <Typography variant='body1' sx={{}} className='' >
            Get some peace and start your Credit Zen journey today with a FREE online credit report consultation
          </Typography>
        </div>

        <div style={{marginBlockEnd: theme.spacing(3)}} className='flex flex-col justify-center items-center'>
          <div>
            <div className='flex flex-row items-center '>
              <div className='flex items-center'>
                <StarRoundedIcon />
              </div>
              <div className='flex items-center'>
                <Typography variant='body1' sx={{}} className=''>
                  Free Credit Score
                </Typography>
              </div>
            </div>
            <div className='flex flex-row items-center '>
              <div className='flex items-center'>
                <StarRoundedIcon />
              </div>
              <div className='flex items-center'>
                <Typography variant='body1' sx={{}} className=''>
                  Free Credit Report Summary
                </Typography>
              </div>
            </div>
            <div className='flex flex-row items-center '>
              <div className='flex items-center'>
                <StarRoundedIcon />
              </div>
              <div className='flex items-center'>
                <Typography variant='body1' sx={{}} className=''>
                  Free Credit Repair Recommendation
                </Typography>
              </div>
            </div>          
          </div>

        </div>

        <div className='text-center' style={{marginBlockEnd: theme.spacing(3)}}>
          <Typography variant='body1' sx={{}} className='font-bold'>
            Experian, TransUnion, and Equifax need a little information before we can pull those credit reports.
          </Typography>
        </div>

        <div className='text-center' style={{marginBlockEnd: theme.spacing(3)}}>
          <Typography variant='body2' sx={{}} className=''>
            Rest at ease, this is secure and won&apos;t damage your score.
          </Typography>
        </div>

        

          <div style={{paddingInline: theme.spacing(3), marginBlockEnd:theme.spacing(3)}}>
            <form onSubmit={(e)=>handleSubmit(e)}>
              <TextField fullWidth onChange={(e)=>{setFreeConsultation({...freeConsultation,firstName:e.target.value})}} variant='outlined' value={freeConsultation.firstName} label='First Name' sx={{marginBlockEnd: theme.spacing(2)}} className=''/>
              <TextField fullWidth onChange={(e)=>{setFreeConsultation({...freeConsultation,lastName:e.target.value})}} variant='outlined' value={freeConsultation.lastName} label='Last Name' sx={{marginBlockEnd: theme.spacing(2)}} className=''/>
              <TextField fullWidth onChange={(e)=>{setFreeConsultation({...freeConsultation,email:e.target.value})}} variant='outlined' value={freeConsultation.email} label='Email' sx={{marginBlockEnd: theme.spacing(2)}} className=''/>

              <div className='flex flex-col gap-3'>
                <div className='flex flex-col gap-3'>
                  <Typography variant='body1' className='text-bold' sx={{}}>
                      Phone
                  </Typography>
                  
                  <div className='flex justify-center items-center gap-1'>
                      <Typography variant='h5' sx={{}} className=''>
                          &#40;
                      </Typography>
                      <TextField 
                      fullWidth
                      sx={{}} 
                      variant="outlined" 
                      className='w-full' 
                      value={phone.sequence_one} 
                      onChange={(e)=>{setPhone({...phone,sequence_one:e.target.value})}} 
                      label="123" 
                      />
                      <Typography variant='h5' sx={{}} className=''>
                          &#41;&nbsp;&nbsp;
                      </Typography>
                      <TextField 
                      fullWidth
                      sx={{}} 
                      variant="outlined" 
                      className='w-full' 
                      value={phone.sequence_two} 
                      onChange={(e)=>{setPhone({...phone, sequence_two:e.target.value})}} 
                      label="456" 
                      />
                      <Typography variant='h6' sx={{}} className=''>
                          -
                      </Typography>
                      <TextField 
                      fullWidth
                      sx={{}} 
                      variant="outlined" 
                      className='w-full' 
                      value={phone.sequence_three} 
                      onChange={(e)=>{setPhone({...phone, sequence_three:e.target.value})}} 
                      label="7890" 
                      />
                      
                  </div>                                            
                </div>
              
                <TextField 
                sx={{}} 
                variant="outlined" 
                className='' 
                value={address.line_one} 
                onChange={(e)=>{setAddress({...address, line_one:e.target.value})}} 
                label="Address line one" 
                />
                
                <TextField 
                sx={{}} 
                variant="outlined" 
                className='' 
                value={address.line_two} 
                onChange={(e)=>{setAddress({...address, line_two:e.target.value})}} 
                label="Address line two" 
                />
                
                <TextField 
                sx={{}} 
                variant="outlined" 
                className='' 
                value={address.city} 
                onChange={(e)=>{setAddress({...address, city:e.target.value})}} 
                label="City" 
                />

                <div className='flex justify-center items-center gap-3'>
                <FormControl sx={{ m: 1, width: 300, ml: 0 }}>
                    <InputLabel id="demo-multiple-checkbox-label">State</InputLabel>
                    <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    value={address.state}
                    onChange={(e)=>{setAddress({...address,state:e.target.value})}}
                    input={<OutlinedInput label="State" />}
                    MenuProps={MenuProps}
                    >
                    {states.map((state) => (
                        <MenuItem key={state.name} value={state.name}>
                        <Checkbox  checked={address.state?.indexOf(state.name) > -1} />
                        <ListItemText primary={state.name} />
                        </MenuItem>
                    ))}
                    </Select>
                </FormControl>
                    
                    <TextField 
                    sx={{}} 
                    variant="outlined" 
                    className='w-3/5' 
                    value={address.zip} 
                    onChange={(e)=>{setAddress({...address, zip:e.target.value})}} 
                    label="Zipcode" 
                    />
                </div>                
              </div>
                


              <div className='w-full'>
                <Button fullWidth variant='contained' type='submit'  size='large'>
                  Start My Credit Zen Journey Now
                </Button>
              </div>
            </form>
          </div>

   


        <div className='text-center' style={{}}>
          <Typography variant='body2' sx={{}} className=''>
          By clicking &apos;Start My Credit Zen Journey Now&apos; I agree by electronic signature to: (1) be contacted by Credit Zen about credit repair or credit repair marketing by a live agent, artificial or prerecorded voice, SMS text at my residential or cellular number, dialed manually or by auto-dialer even if my phone number is on a do-not-call registry, and by email (consent to be contacted is not conditioned to purchase services); and (2) the <Typography variant='body2' sx={{color: '#0FCCF3'}} className='inline-block'> Privacy Policy</Typography> and <Typography variant='body2' sx={{color: '#0FCCF3'}} className='inline-block'>Terms of Use  </Typography>(including this <Typography variant='body2' sx={{color: '#0FCCF3'}} className='inline-block'>arbitration provision</Typography>). 
          </Typography>
        </div>


      </div>
    </Box>

  )
}

export default FreeCreditReportConsultation