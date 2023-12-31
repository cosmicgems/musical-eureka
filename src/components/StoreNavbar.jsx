
import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AdbIcon from '@mui/icons-material/Adb';
import { useStateContext } from '../../Context/StateContext';
import { AiOutlineShopping } from 'react-icons/ai'
import { Grid } from '@mui/material';
import Link from 'next/link';
import { blue, deepPurple, green, orange, yellow, lightBlue, cyan, red, grey } from '@mui/material/colors';
import { motion } from 'framer-motion'
import Subscribe from './Subscribe';
import { navItems } from '../../public/assets/navItems';
import { getSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import UserCard from './User/UserCard';
import UserCardMobile from './User/UserCardMobile';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Cart from './Store/Cart/Cart';

const drawerWidth = 300;
const drawerWidthStore = "10%"


function StoreNavbar(props) {
    const router = useRouter();
    const {pageName, pageSlug, pathSegment, showCart, setShowCart, totalQuantities, subcategories } = useStateContext();
    const { window, user } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [loggedIn, setLoggedIn] = React.useState(false);
    

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const pageSegmentColors = {
    technology: blue[800], 
    realty: yellow[600],
    health: lightBlue[200],
    intelligence: orange[500],
    community: deepPurple[400],
    finance: green[500],
    art: cyan[500],
  };


  const appBarBackgroundColor = pageSegmentColors[pathSegment] || grey[900];
  const drawer = (
    <Box onClick={handleDrawerToggle} className="h-full" sx={{ textAlign: 'center' , bgcolor:grey[900]}}>
    <Link href='/'>
      <Typography className='gradient-text font-bold' variant="h6" sx={{ my: 2, fontSize: '2rem' }}>
        Pearl Box 
      </Typography>
      <div className='px-20'>
        <Divider className='mb-3' sx={{color: grey[50], borderWidth: '2px', borderRadius: '20%'}} />
      </div>
                      
    </Link>
          {
            loggedIn && 
            <div className='px-6 '>
            <Typography variant='body1' className='gradient-text mb-2' sx={{fontSize: '1.5rem'}}>
              Hello {user?.first_name},
            </Typography>
              <UserCardMobile />
                <Divider className='mt-3' sx={{color: grey[50], borderWidth: '2px', borderRadius: '20%'}} />
            </div>
          }
          {
            !loggedIn &&
            <div className='sm:hidden mt-6 mb-3 flex flex-col gap-1'>
            <Typography variant='body1' className='gradient-text mb-2' sx={{fontSize: '1.15rem'}}>
              Cultivate a lifestyle worth living.
            </Typography>
              <Subscribe />
            </div>
          }
  

      <List>
        {navItems.map((item, i) => (
          <ListItem key={item.name + i.toString()} disablePadding>
            <ListItemButton href={item.path} sx={{ textAlign: 'center' }}>
              <ListItemText  variant="h3" className='gradient-text' >
                <Typography className='font-bold' variant='h3' sx={{fontSize: '1.5rem'}}>
                  {item.name.toLocaleUpperCase()}
                </Typography>
              </ListItemText>
            </ListItemButton>
          </ListItem>
        ))}
      </List>


    </Box>
  );



  React.useEffect(()=>{
    if(user === null || user === undefined){
      setLoggedIn(false);
    } else {
      setLoggedIn(true);
    }
})

  const container = window !== undefined ? () => window().document.body : undefined;
  
  const handleSignin = (e) => {
    e.preventDefault();
    router.push("/auth/login");
};

const handleSignup = (e) => {
    e.preventDefault();
    router.push("/auth/signup");
}


  return (
    <Box className="max-w-screen" sx={{ display: 'flex' , paddingBlock:0 , width: '100%'}}>
      <CssBaseline />
      <AppBar    component="nav" sx={{paddingBlock: 0, width: {xs: '100%', sm: '100%'}, paddingInlineEnd: 0 , bgcolor:appBarBackgroundColor, zIndex: 10}}>
        <Toolbar sx={{paddingBlock: 0}}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>

          
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              fontSize: "2rem",
              ml: 'auto',
              display: { sm: 'none' },
              // fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              // color: 'inherit',
              textDecoration: 'none',
            }}
            className='gradient-text font-bold'
          >
            {pathSegment?.toLocaleUpperCase()}
          </Typography>

          <Box sx={{display:{sm:"none"}}} className="ml-12" >
            <div className='flex gap-3'>
              {
                !loggedIn ?
                  <div className='flex gap-3'>
                    <Button onClick={(e) => handleSignin(e)}  variant='contained' className='gradient-button' sx={{border:"none"}}>
                      Login
                    </Button>
                    <Button onClick={(e) => handleSignup(e)} variant='outlined' className='gradient-button-signup' sx={{p:"3px", border: "none"}}>
                      <Box sx={{bgcolor:grey[900], p:1, borderRadius: "2px"}}>
                        <Typography  className='gradient-text-button font-bold'>
                          Signup
                        </Typography>
                      </Box>
                    </Button>
                  </div>
                :
                  <div className='flex gap-3'>
                    <Button onClick={()=> signOut()} variant='contained' className='gradient-button' sx={{}}>
                      Logout
                    </Button>
                  </div>
              }

            </div>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
            <Link href='/'>
                <motion.div
                whileTap={{ scale: 0.9 }}>
                  <Typography
                  className='gradient-text-subcategories'
                    variant="h5"
                    component="div"
                    sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' }, fontSize: '3rem' }}
                  >
                    Pearl Box
                  </Typography>                  
                </motion.div>
            
            </Link>            
          </Box>

          {/* <Box sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' }, paddingInline: '5vw', paddingBlock:'1vh' }}>
           <Subscribe />            
          </Box> */}


          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItems.map((item, i) => (
              <Button key={item.name + i.toString() + item.path} sx={{ color: '#fff', marginInlineEnd: '2vw' }} href={item.path}>
                <motion.div
                whileHover={{ scale: 2 }}
                whileTap={{ scale: 0.9 }}>
                    {item.name}
                </motion.div>

              </Button>
            ))}
                <button type='button'
                  className='cart-icon' style={{marginInline:'1vw', justifyContent: 'center', alignItems:'center'}} onClick={() => setShowCart(true)}>
                  <AiOutlineShopping/>
                  <span className='cart-item-qty'>{totalQuantities}</span>
                </button>  
          </Box>
        </Toolbar>

        
          <Grid container spacing={0} justifyContent='space-evenly' sx={{ display: { xs: 'none', sm: 'flex' }, padding: 0 }}>
            {subcategories?.map((item, i) => (
              
              <Grid item key={item._id + i.toString()}>
                <motion.div
                whileHover={{scale: 2 }}
                whileTap={{ scale: 0.9 }}
                >
                  <Button  sx={{ color: '#fff', fontSize: '.5rem', padding:0 }} href={`/${pathSegment}/categories/category/${item.slug.current}`} >
                    {item.name}
                  </Button>                  
                </motion.div>

              </Grid>

            ))}
            </Grid>

    


      </AppBar>
      {/* <main className='main-container max-w-screen'>
        
      </main> */}
        <Drawer
        variant="permanent"
        sx={{
          width: drawerWidthStore,
          flexShrink: 0,
          zIndex:1,
          [`& .MuiDrawer-paper`]: { width: drawerWidthStore, boxSizing: 'border-box' }, display:{xs:"none", sm:"block"}
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {['All mail', 'Trash', 'Spam'].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      <Box className=" py-3 max-w-screen  sm:max-w-[90%]">
        {props.children}
      </Box>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
          
      {showCart && 
      <div className='navbar-container'>
      <Cart />
      </div>
      }
   
    </Box>
  );
}



export default StoreNavbar