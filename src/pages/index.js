import Image from 'next/image'
import { Inter } from 'next/font/google'
import { Card, CardContent, CardMedia, Grid, Typography } from '@mui/material'
import { blue, grey, red } from '@mui/material/colors'
import { useStateContext } from '../../Context/StateContext'
import { motion } from 'framer-motion'
import { set } from 'mongoose'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Layout from '../components/Layout'
import NavBar from '../components/NavBar'
import MobileIndexCategoryCard from '../components/technology/MobileIndexCategoryCard'

const inter = Inter({ subsets: ['latin'] })


const pages = [
  {
    name: "Technology",
    image: "https://images.pexels.com/photos/4816921/pexels-photo-4816921.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    id: "tech",
    title: "pearl-box-technology",
    href: "/technology",
  },
  {
    name: "Realty",
    image: "https://images.pexels.com/photos/7535071/pexels-photo-7535071.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    id: "realty",
    title: "pearl-box-realty",
    href: "/realty",
  },
  {
    name: "Health",
    image: "https://images.pexels.com/photos/5452291/pexels-photo-5452291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    id: "health",
    title: "pearl-box-health",
    href: "/health",
  },
  {
    name: "Intelligence",
    image: "https://images.pexels.com/photos/10525700/pexels-photo-10525700.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    id: "intelligence",
    title: "pearl-box-intelligence",
    href: "/intelligence",
  },
  {
    name: "Community",
    image: "https://images.pexels.com/photos/4262416/pexels-photo-4262416.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    id: "community",
    title: "pearl-box-community",
    href: "/community",
  },
  {
    name: "Finance",
    image: "https://images.pexels.com/photos/4386476/pexels-photo-4386476.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    id: "finance",
    title: "pearl-box-finance",
    href: "/finance",
  },
]



export default function Home() {
  const { industryHoverName, setIndustryHoverName } = useStateContext();





  return (
    <main
    >



          <Grid container spacing={0} sx={{minHeight: {md:'100vh'}, position:{lg: 'absolute'}, bgcolor: grey[900], color: red[900], display: {xs:'none', md:'flex'}}}>

            <Grid item lg={2} > 
              <Link href='/technology'>
                <motion.div
                whileHover={{x: '-50%', scaleX: 1.1 }}
                whileTap={{ scaleX: 0.9 }}
                >
                  <Card sx={{borderRadius: 0}}
                  >
                    <CardMedia
                    id='tech'
                    sx={{ height: '100vh', objectFit: 'cover' }}
                    image="https://images.pexels.com/photos/4816921/pexels-photo-4816921.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    title="pearl-box-tech"
                    onMouseOver={(e)=>{setIndustryHoverName(e.target.id)}}
                    />      

                  </Card>          
                </motion.div>      
              </Link>

            </Grid>

            <Grid item lg={2} >
              <Link href='/realty'>
                <motion.div
                whileHover={{x: '-50%', scaleX: 1.1 }}
                whileTap={{ scaleX: 0.9 }}
                >
                  <Card sx={{borderRadius: 0}}> 
                    <CardMedia
                    id='realty'
                    onMouseOver={(e)=>{setIndustryHoverName(e.target.id)}} 
                    sx={{ height: '100vh', objectFit: 'cover' }}
                    image="https://images.pexels.com/photos/7535071/pexels-photo-7535071.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    title="pearl-box-tech"
                    />
                  </Card>          
                </motion.div>
              </Link>
            </Grid>


            <Grid item lg={2} > 
              <Link href='/health'>
                <motion.div

                whileHover={{x: '-50%', scaleX: 1.1 }}
                whileTap={{ scaleX: 0.9 }}
                >
                  <Card sx={{borderRadius: 0}}> 
                    <CardMedia
                    id='health'
                  onMouseOver={(e)=>{setIndustryHoverName(e.target.id)}}
                    sx={{ height: '100vh', objectFit: 'cover' }}
                    image="https://images.pexels.com/photos/5452291/pexels-photo-5452291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    title="pearl-box-tech"
                    />
                  </Card>          
                </motion.div>
              </Link>
            </Grid>


            <Grid item lg={2} > 
              <Link href='/intelligence'>
                <motion.div
                whileHover={{x: '-50%', scaleX: 1.1 }}
                whileTap={{ scaleX: 0.9 }}
                >
                  <Card sx={{borderRadius: 0}}> 
                    <CardMedia 
                    id='intelligence'
                  onMouseOver={(e)=>{setIndustryHoverName(e.target.id)}}
                    sx={{ height: '100vh', objectFit: 'cover' }}
                    image="https://images.pexels.com/photos/10525700/pexels-photo-10525700.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    title="pearl-box-tech"
                    />
                  </Card>          
                </motion.div>
              </Link>
            </Grid>


            <Grid item lg={2} > 
              <Link href='/community'>
                <motion.div
                id='community'
                whileHover={{x: '-50%',scaleX: 1.1 }}
                whileTap={{ scaleX: 0.9 }}
                >
                  <Card sx={{borderRadius: 0}}> 
                    <CardMedia 
                    id='community'
                  onMouseOver={(e)=>{setIndustryHoverName(e.target.id)}}
                    sx={{ height: '100vh', objectFit: 'cover' }}
                    image="https://images.pexels.com/photos/4262416/pexels-photo-4262416.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    title="pearl-box-tech"
                    />
                  </Card>          
                </motion.div>
              </Link>
            </Grid>


            <Grid item lg={2} > 
              <Link href='/finance'>
                <motion.div
                
                whileHover={{x: '-50%', scaleX: 1.1   }}
                whileTap={{ scaleX: 0.9 }}
                >
                  <Card sx={{borderRadius: 0}}> 
                    <CardMedia 
                    id='finance'
                  onMouseOver={(e)=>{setIndustryHoverName(e.target.id)}}
                    sx={{ height: '100vh', objectFit: 'cover' }}
                    image="https://images.pexels.com/photos/4386476/pexels-photo-4386476.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    title="pearl-box-tech"
                    />
                  </Card>          
                </motion.div>
              </Link>
            </Grid>
          </Grid>

          <Grid container columns={12}  sx={{ position:{xs: 'absolute',}, bgcolor: grey[900], color: red[900], display: { md:'none'}}}>

            {pages.map((page) => {
              return <Grid item xs={4} row  sx={{}} key={page.id}>
                <MobileIndexCategoryCard page={page} />
              </Grid>
            })}

          </Grid>

          <Grid container style={{paddingBlock: 0, marginBlock: 0,  justifyContent: 'center', alignItems:'center', minHeight: '100vh'}}>
            <Grid item >
              <Typography variant='h1' component='div' sx={{position:'relative', color: grey[50], width: '100%', textAlign: 'center', height: '100%',   fontSize: {xs: '8rem', sm: '15rem',md:'20vh'}, lineHeight: {xs: '.75'}, textShadow: '1px 1px #000000'}}>
                Pearl Box <span className='index-hover-title-span' style={{fontWeight: 'bold'}}>{industryHoverName !== '' && industryHoverName.toUpperCase() }</span>
              </Typography>     
            </Grid>
          </Grid>



    </main>
  )
}
