import React, { useState, useEffect } from 'react'
import {
  Typography,
  Button,
  CardMedia, 
} from '@mui/material'
import theme from '../../../styles/theme/lightThemeOptions'
import { motion } from 'framer-motion'
import { grey } from '@mui/material/colors'

const CreditRepairVsCreditBuilding = () => {

  const [opacityRepair, setOpacityRepair] = useState(1);
  const [opacityBuild, setOpacityBuild] = useState(1);
  const [repair, setRepair] = useState(false);
  const [build, setBuild] = useState(false);

  
  useEffect(() => {
    if (repair) {
      setTimeout(() => {
        setRepair(false);
        setOpacityRepair(1);
        setOpacityBuild(1);
      }, 7000);
    } else if (build) {
      setTimeout(() => {
        setBuild(false);
        setOpacityRepair(1);
        setOpacityBuild(1);
      }, 7000);
    }
  }, [repair, build]);

  return (
    <>


        {repair || build ?
         <>
          {/* <div className="video-container min-h-screen "> */}
            <CardMedia
            component="div"
            className="video-container min-h-screen"
            image={`${ repair ? '/credit_zen_video_demo/credit_repair_vertical.gif' : build ?  '/credit_zen_video_demo/credit_build_vertical.gif' : ''}`} />
              {/* <video autoPlay muted loop className="background-video min-h-screen"  preload="auto">
                <source src={`${ repair ? '/video_demo/credit_repair_vertical.mp4' : build ?  '/video_demo/credit_build_vertical.mp4' : ''}`} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div> */}
          <motion.div 
          initial={{opacity:0}}
          animate={{opacity:1}}
          transition={{duration: 0.75}} className="overlay min-h-screen"/>          
         </>         
         :null}

          
      

    


      <div className='min-h-screen flex flex-col justify-center' style={{paddingInline: theme.spacing(3), paddingBlock: theme.spacing(3), backgroundColor: `${repair || build ? " " : theme.palette.primary.light }`}}>

          {repair || build ?
            <Typography sx={{marginBlockEnd: theme.spacing(3), color: theme.palette.secondary.main}} variant='h4' component="div" className='text-center ' >
              Let&apos;s meditate on <Typography variant='h4' className='inline-block italic' sx={{}}>Credit Repair</Typography> and <Typography variant='h4' className='inline-block italic' sx={{}}>Credit Building</Typography> 
            </Typography> :  
            <Typography sx={{marginBlockEnd: theme.spacing(3),  }} variant='h4' className='text-center ' >
              Let&apos;s meditate on <Typography variant='h4' className='inline-block italic' sx={{}}>Credit Repair</Typography> and <Typography variant='h4' className='inline-block italic' sx={{}}>Credit Building</Typography> 
            </Typography>          
          }

          {repair || build ? <div className='grow' /> :
            <Typography sx={{paddingInline: theme.spacing(3), marginBlockEnd: theme.spacing(6), }} className=' text-center' variant='body1' >
            Building credit and repairing credit are like tending to a garden – one involves nurturing and cultivating new growth, while the other focuses on pruning and revitalizing existing plants.
            </Typography>         
          }



          <div className='grow' style={{marginBlockEnd: theme.spacing(6)}}>

            {opacityRepair >= 0.25 ? 
              <>
                <div style={{marginBlockEnd: theme.spacing(3)}}>

                  <div className='p-1' style={{backgroundColor: grey[500], width:'100%', borderRadius: '10px', opacity: opacityRepair,}}>
                    <motion.div 
                    style={{height: '7vh', width:'14vh', backgroundColor: theme.palette.primary.main, borderRadius: '10px', }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 255}}
                    dragElastic={0.05}
                    onDrag={(event, info) => {
                      const newOpacity = 1 - (info.point.x / 400);
                      setOpacityRepair(newOpacity);
                      if(newOpacity <= .75) {
                        setBuild(false);
                        setOpacityBuild(0);
                        setRepair(true);
                      }
                      
                    }}
                    className='items-center text-center justify-center flex'
                    > 
                      <Typography variant='body2'  component='div' className='' sx={{color: grey[50]}}>
                        Credit Repair
                      </Typography>                
                    </motion.div>           
                  </div>

                </div>
                <div>
                  <div className='p-1' style={{backgroundColor: grey[500], width:'100%', borderRadius: '10px', opacity: opacityBuild, }}>
                    <motion.div 
                    style={{height: '7vh', width:'14vh', backgroundColor: theme.palette.secondary.main, borderRadius: '10px',}}
                    drag="x"
                    dragConstraints={{ left: 0, right: 255}}
                    dragElastic={0}
                    onDrag={(event, info) => {                
                      const newOpacity = 1 - (info.point.x / 500);
                      
                      if(newOpacity <= .75) {
                        setRepair(false);
                        setOpacityRepair(0);
                        setBuild(true);
                      }
                      setOpacityBuild(newOpacity);
                      
                    }}
                    className='items-center text-center justify-center flex'
                    > 
                      <Typography variant='body2'  component='div' className='' sx={{color: grey[800]}}>
                        Credit Building
                      </Typography>                
                    </motion.div>       
                  </div>
                  
                </div>              
              </>
            : opacityBuild >= 0.25 ? 
              <>
                <div style={{marginBlockEnd: theme.spacing(3)}}>

                  <div className='p-1' style={{backgroundColor: grey[500], width:'100%', borderRadius: '10px', opacity: opacityRepair,}}>
                    <motion.div 
                    style={{height: '7vh', width:'14vh', backgroundColor: theme.palette.primary.main, borderRadius: '10px', }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 255}}
                    dragElastic={0}
                    onDrag={(event, info) => {
                      const newOpacity = 1 - (info.point.x / 400);
                      setOpacityRepair(newOpacity);
                      if(newOpacity <= .75) {
                        setBuild(false);
                        setOpacityBuild(0);
                        setRepair(true);
                      }
                      
                    }}
                    className='items-center text-center justify-center flex'
                    > 
                      <Typography variant='body2'  component='div' className='' sx={{color: grey[50]}}>
                        Credit Repair
                      </Typography>                
                    </motion.div>           
                  </div>

                </div>
                <div>
                  <div className='p-1' style={{backgroundColor: grey[500], width:'100%', borderRadius: '10px', opacity: opacityBuild, }}>
                    <motion.div 
                    style={{height: '7vh', width:'14vh', backgroundColor: theme.palette.secondary.main, borderRadius: '10px',}}
                    drag="x"
                    dragConstraints={{ left: 0, right: 255}}
                    dragElastic={0}
                    onDrag={(event, info) => {                
                      const newOpacity = 1 - (info.point.x / 500);
                      
                      if(newOpacity <= .75) {
                        setRepair(false);
                        setOpacityRepair(0);
                        setBuild(true);
                      }
                      setOpacityBuild(newOpacity);
                      
                    }}
                    className='items-center text-center justify-center flex'
                    > 
                      <Typography variant='body2'  component='div' className='' sx={{color: grey[800]}}>
                        Credit Building
                      </Typography>                
                    </motion.div>       
                  </div>
                  
                </div>              
              </>           
            : null
            }

            {repair ? 
              <Typography variant='h6' component='div' sx={{color: theme.palette.secondary.light}} className='text-center grow' >
                This is the process where erroneous or unverifiable information is sought after and removed from your credit profile.
              </Typography> 
            : build ?
              <Typography variant='h6' component='div' sx={{color: theme.palette.secondary.light}} className='text-center grow' >
                This is the process of adding items that positively impact your credit profile, and continuing to nurture the good that&apos;s already there.
              </Typography>            
            :null}

          </div>

          <div className='text-center'>
            <Typography variant='body1' sx={{marginBlockEnd: theme.spacing(3), color:`${repair ? grey[50] : build ? grey[200] : ''}`}} className='' >
              With Credit Zen, you can get some solitude. We have you covered with credit building, and repair.
            </Typography>
            <Typography variant='body2' sx={{marginBlockEnd: theme.spacing(3), color:`${repair ? grey[300] : build ? grey[300] : ''}`}} className='' >
            Find out what your credit needs, with a FREE Credit Assessment.
            </Typography>          
          </div>
          
          <div className='text-center' >
            <Button variant='contained' >
              Start Now
            </Button>
          </div>
      </div>

        

    </>

  )
}

export default CreditRepairVsCreditBuilding