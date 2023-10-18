import { Box, Button, CardMedia, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import React, { useState } from 'react'
import { userChipItems } from '../../../public/assets/userChipItems'

const profile = []

const DynamicMobileUserChip = ({user}) => {
  
  const [chip, setChip] = useState<boolean>(true);

  const handleChipTransformation = (loc) => {
    if(loc === "pic"){
      setChip(!chip);
      return
    }
    if(!chip){
      return
    }
    setChip(!chip);
  }

  return (
    <div onClick={() => {handleChipTransformation("whole")}} className='w-[100%] flex px-6 h-content'>
          <div onClick={() => {handleChipTransformation("pic")}} className={chip ? `h-[60px] w-[60px]  ` : `h-full `}>
            <CardMedia 
              component='img'
              image={user?.photo}
              alt={user?.about}
              sx={{borderBottomLeftRadius:"50%", borderTopLeftRadius:"50%",}}
              className={chip ? `h-full object-cover ` : `h-full object-cover w-[75px] max-h-[90px]`}
              />          
          </div>
      <Box sx={{bgcolor: grey[900], }} className={chip ? "grow  " : "max-h-[90px] rounded-br-3xl "}>
        <div className='flex'>


          {
            chip ?
              <div className='w-full flex flex-col justify-center items-center'>
                <Typography variant='body1' sx={{fontSize:'1.5rem'}} className='gradient-text px-6 py-1 w-full text-center'>
                  {user?.username}
                </Typography>
              </div>
            :
              <div className='py-1 max-h-[80px] overflow-y-scroll scrollable-container-two'>
                {
                  userChipItems.map((item, i)=> {
                    
                    if(user.role === 0){
                      if(item.auth_level === 0){
                        return(
                          <Button key={item._id} fullWidth href={item.add_username ? `${item.href}${user.username}`: `${item.href}`} className='h-full scrollable-item-two'>
                            <Typography className='gradient-text' >
                              {item.name}
                            </Typography>
                          </Button>
                        )
                      }
                    }

                    if(user.role === 24){
                      return(
                        <Button key={item._id} fullWidth href={item.add_username ? `${item.href}${user.username}`: `${item.href}`} className='h-full scrollable-item-two'>
                          <Typography className='gradient-text' >
                            {item.name}
                          </Typography>
                        </Button>
                      )                      
                    }


                  })
                }
              </div>
          }

        </div>
      </Box>

      <Box sx={{bgcolor:grey[900], borderBottomRightRadius:"50%", borderTopRightRadius:"50%"}} className=" w-[60px] h-[60px]" />
    </div>

  )
}

export default DynamicMobileUserChip