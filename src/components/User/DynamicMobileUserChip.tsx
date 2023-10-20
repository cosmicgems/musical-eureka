import { Box, Button, CardMedia, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import React, { useState } from 'react'
import { userChipItems } from '../../../public/assets/userChipItems'

const profile = []

const DynamicMobileUserChip = ({user}) => {
  
  const [chip, setChip] = useState<boolean>(true);

  const admin_twelve = userChipItems.filter((ar) => ar.auth_level === 12);

  const admin_twenty_four = userChipItems.filter((ar) => ar.auth_level === 24);

  const user_zero = userChipItems.filter((ar) => ar.auth_level === 0);

  const adminTwelveActions = admin_twelve.length + user_zero.length;

  const adminTwentyFourActions= adminTwelveActions + admin_twenty_four.length;
  
  const userZeroActions = user_zero.length;

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
                      
  let count = 0;
  
  return (
    <div onClick={() => {handleChipTransformation("whole")}} className='w-full flex px-10 h-content'>
      <div className='flex w-full'>
            <div onClick={() => {handleChipTransformation("pic")}} className={chip ? `h-[60px] w-[60px]  ` : `h-full `}>
              <CardMedia 
                component='img'
                image={user?.photo}
                alt={user?.about}
                sx={{borderBottomLeftRadius:"50%", borderTopLeftRadius:"50%",}}
                className={chip ? `h-full object-cover ` : `h-full object-cover w-[75px] max-h-[80px]`}
                />          
            </div>
        <Box sx={{bgcolor: grey[900], }} className={chip ? "grow  " : "max-h-[80px] rounded-br-3xl "}>
          <div className='flex'>


            {
              chip ?
                <div className='w-full flex flex-col justify-center items-center'>
                  <Typography variant='body1' sx={{fontSize:'1.5rem'}} className='gradient-text  py-1 w-full text-center'>
                    {user?.username}
                  </Typography>
                </div>
              :
                <div className='py-1 max-h-[80px] overflow-y-scroll scrollable-container-two'>
                  {
                    userChipItems.map((item, i)=> {

                      if(user.role === 0){
                        if(item.auth_level === 0){
                          count += 1

                          if(count === userZeroActions) {
                            return(
                              <Button key={item._id} fullWidth href={item.add_username ? `${item.href}${user.username}`: `${item.href}`} className='h-full scrollable-item-two'>
                                <Typography className='gradient-text-four' >
                                  {item.name}
                                </Typography>
                              </Button>
                            )
                          }

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
                        count ++
                        console.log(count, adminTwentyFourActions);
                        

                        if(count === adminTwentyFourActions) {
                          return(
                            <Button key={item._id} fullWidth href={item.add_username ? `${item.href}${user.username}`: `${item.href}`} className='h-full scrollable-item-two'>
                              <Typography className='gradient-text-three' >
                                {item.name}
                              </Typography>
                            </Button>
                          )
                        }
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
      </div>


      <Box sx={{bgcolor:grey[900], borderBottomRightRadius:"50%", borderTopRightRadius:"50%"}} className=" w-[60px] h-[60px]" />
    </div>

  )
}

export default DynamicMobileUserChip