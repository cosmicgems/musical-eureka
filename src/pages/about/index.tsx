import { Box, Button, Card, CardContent, CardMedia, Grid, Typography } from '@mui/material'
import Link from 'next/link';
import React from 'react'
import { motion } from 'framer-motion'
import { useStateContext } from '../../../Context/StateContext';
import { blue, grey, lightBlue, green, lightGreen, deepPurple, orange, yellow, cyan, red, } from '@mui/material/colors';
import Layout from '../../components/Layout';
import CoreValues from '../../components/About Page/Core Values/CoreValues';
import MissionStatement from '../../components/About Page/Mission Statement/MissionStatement';



const AboutPage = () => {

const coreValues = ['Passion', 'Purpose', 'Innovation', 'Growth', 'Integrity', 'Impact', 'Simplicity', 'Balance', ];

const {pageName, pathSegment, subcategories} = useStateContext();

const pageSegmentColors = {
  technology: blue[100], // Example color for "tech" segment
  realty: yellow[100],
  health: lightBlue[100],
  intelligence: orange[100],
  community: deepPurple[100],
  finance: green[100], 
  art: cyan[100],
};

const indexFontColor = pageSegmentColors[pathSegment] || grey[800];

  return (
    <Box sx={{}}>
      <Layout>
        <div className='flex flex-col gap-6' style={{width: '100%', marginBlockStart: ''}}>
          <Typography className='gradient-text-subcategories' variant='h2' component='div' sx={{width:'100%', textAlign:'center', marginBlock: '2vh', color: indexFontColor, fontSize: {xs:'4rem',md:'6rem'}, fontWeight: 'bold'}}>
            Pearl Box
          </Typography>

          <div>

          </div>

          <div className='flex flex-col md:flex-row'>
            
            <div className='md:w-1/3'>
              <MissionStatement />
            </div>

            <div className='md:w-2/3'>
              <CoreValues />
            </div>
            

          </div>

        </div>      
      </Layout>      
    </Box>
  )
}

export default AboutPage


                                // <motion.div
                                // whileHover={{x: '-50%', scaleX: 1.1 }}
                                // whileTap={{ scaleX: 0.9 }}
                                // >