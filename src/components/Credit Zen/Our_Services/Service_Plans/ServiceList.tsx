import { features, services } from '../../../../../public/assets/services'
import theme from '../../../../styles/theme/lightThemeOptions'
import { Typography } from '@mui/material'
import React from 'react'
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';

const ServiceList = () => {
  return (
    <div >
      
      <div className='flex flex-row gap-3'>

        <div className='flex flex-col '>

          <div>
            <div className='flex flex-col justify-end items-start h-[7vh]'>
              <Typography variant='h6' sx={{}} className=' '>
                Features
              </Typography>              
            </div>


            <div>
              <hr/>
            </div>
          </div>

          <div className='flex flex-row'>

            <div className='flex flex-col  '>
              {features.map((f, i) => {
                return (
                  <div className='text-left h-[5vh] flex items-center' key={i.toString + f.name + 'featureOnly'} style={{marginBlockEnd: theme.spacing(3)}}>
                    <Typography variant='caption' sx={{}} className=''>
                      {f.name}
                    </Typography>
                  </div>
                )
              })}            
            </div> 
           
          </div>


        </div>

        <div className='flex flex-row gap-3'>
          
            {services.map((s, i) => {
              const {features} = s
              return(
                <div key={s.name} >
                  <div className='h-[7vh]'>
                    <Typography variant='body1' sx={{}} className='font-bold'>
                    {s.name}
                    </Typography>
                    <Typography variant='body2' sx={{color:theme.palette.primary.main}} className='font-bold'>
                      {s.type}
                    </Typography>                    
                  </div>


                  <div>
                    <hr/>
                  </div>
                  <div className='flex flex-col'>
                    
                          {features.map((f, i)=> {
                            if(!f.inclusion){
                              return null
                            } else {
                              return(
                                <div className='h-[5vh] flex items-center justify-center' key={f.name} style={{marginBlockEnd: theme.spacing(3)}}>
                                  <CheckRoundedIcon />
                                </div>
                              )                      
                            }

                          })}
                  </div>
                </div>                
              )
            })}

        </div>
      </div>
    </div>
  )
}

export default ServiceList