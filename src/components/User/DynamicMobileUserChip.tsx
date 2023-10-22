import { Box, Button, CardMedia, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import React, { useEffect, useRef, useState } from 'react'
import { userChipItems } from '../../../public/assets/userChipItems'
import {motion} from "framer-motion"

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
  const scrollContainerRef = useRef(null);

  useEffect(() => {
      const scrollContainer = scrollContainerRef.current;
  
      // Add an event listener to handle scroll snap on scroll end
      const handleScroll = () => {
      const scrollLeft = scrollContainer.scrollLeft;
      const containerWidth = scrollContainer.clientWidth;
      const featuredCards = scrollContainer.querySelectorAll('.scrollable-item');
  
      let nearestCard = null;
      let minDistance = Infinity;
  
      // Find the nearest project card based on scroll position
      featuredCards.forEach((card) => {
          const cardRect = card.getBoundingClientRect();
          const distance = Math.abs(cardRect.left - scrollLeft);
  
          if (distance < minDistance) {
          minDistance = distance;
          nearestCard = card;
          }
      });
  
      // Snap to the nearest project card
      if (nearestCard) {
          scrollContainer.scrollTo({
          left: nearestCard.offsetLeft,
          behavior: 'smooth',
          });
      }
      };
  
      if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
      }
  
      return () => {
      if (scrollContainer) {
          scrollContainer.removeEventListener('scroll', handleScroll);
      }
      };
  
  }, []);

                      
  let count = 0;
  
  return (
    <motion.div drag
    whileDrag={{ scale: 1.1 }}
    whileHover={{ scale: 1.1 }}
    
    dragConstraints={{
    top: 0,
    left: -250,
    right: 25,
    bottom: 250,
    }}  onClick={() => {handleChipTransformation("whole")}} className='w-full flex px-20 sm:px-6 h-content'>
      <div className='flex w-full p-0'>
            <div onClick={() => {handleChipTransformation("pic")}} className={chip ? `h-[60px] sm:h-[65px] w-[60px]  ` : `h-full `}>
              <CardMedia 
                component='img'
                image={user?.photo}
                alt={user?.about}
                sx={{borderBottomLeftRadius:"50%", borderTopLeftRadius:"50%",}}
                className={chip ? `h-full object-cover ` : `h-full object-cover w-[75px] max-h-[80px] sm:max-h-[80px]`}
                />          
            </div>
        <Box sx={{bgcolor: grey[900], }} className={chip ? "grow  " : "max-h-[80px] sm:max-h-[80px] rounded-br-3xl grow "}>
          <div className='py-1 gap-3 flex flex-col max-h-[80px]  overflow-y-scroll scrollable-container-two'>


            {
              chip ?
                <div className='w-full flex flex-col justify-center items-center'>
                  <Typography variant='body1' sx={{fontSize:'1.5rem'}} className='gradient-text  py-1 w-full text-center'>
                    {user?.username}
                  </Typography>
                </div>
              :
                <div className='h-full flex flex-col'>
                  {
                    userChipItems.map((item, i)=> {

                      if(user.role === 0){
                        if(item.auth_level === 0){
                          count += 1

                          if(count === userZeroActions) {
                            return(
                              <div key={item._id}>
                                <Button  href={item.add_username ? `${item.href}${user.username}`: `${item.href}`} className='h-full scrollable-item-two'>
                                  <Typography className='gradient-text-four' >
                                    {item.name}
                                  </Typography>
                                </Button>                                
                              </div>

                            )
                          }

                          return(
                            <div key={item._id}>
                              <Button  href={item.add_username ? `${item.href}${user.username}`: `${item.href}`} className='h-full scrollable-item-two'>
                                <Typography className='gradient-text' >
                                  {item.name}
                                </Typography>
                              </Button>                              
                            </div>

                          )
                        }
                      }

                      if(user.role === 24){
                        count ++
                        console.log(count, adminTwentyFourActions);
                        

                        if(count === adminTwentyFourActions) {
                          return(
                              <Button key={item._id}  href={item.add_username ? `${item.href}${user.username}`: `${item.href}`} className=' h-[80px]  scrollable-item-two'>
                                <Typography className='gradient-text-three' >
                                  {item.name}
                                </Typography>
                              </Button>

                          )
                        }
                        return(
                            <Button key={item._id}   href={item.add_username ? `${item.href}${user.username}`: `${item.href}`} className=' h-[80px]  scrollable-item-two'>
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


      <Box sx={{bgcolor:grey[900], borderBottomRightRadius:"50%", borderTopRightRadius:"50%"}} className=" w-[60px] h-[60px] sm:w-[65px] sm:h-[65px]" />
    </motion.div>

  )
}

export default DynamicMobileUserChip