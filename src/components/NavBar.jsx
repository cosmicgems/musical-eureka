
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
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AdbIcon from '@mui/icons-material/Adb';
import { useStateContext } from '../../Context/StateContext';
import { AiOutlineShopping } from 'react-icons/ai'
import Cart from './Cart'
import { Grid } from '@mui/material';
import Link from 'next/link';

const drawerWidth = 240;


function NavBar(props) {
    const {pageName, pageSlug, pathSegment, showCart, setShowCart, totalQuantities, subcategories } = useStateContext();
    const navItems = [`${pathSegment} Home`, 'Articles', 'Categories', 'About', 'Contact', 'Shop'];
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    console.log(subcategories);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };



  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Pearl Box 
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton href={item.toLowerCase() === `${pathSegment} home` ? `/${pathSegment}` : `/${pathSegment}/${item.toLowerCase()}`} sx={{ textAlign: 'center' }}>
              <ListItemText primary={item.toLocaleUpperCase()} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;


  return (
    <Box sx={{ display: 'flex' , paddingBlock:0 }}>
      <CssBaseline />
      <AppBar position='sticky' component="nav" sx={{paddingBlock: 0}}>
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
         
          <AdbIcon sx={{ display: { sm: 'none' }, mr: 1, ml:2 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 4,
              display: { sm: 'none' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            {pathSegment?.toLocaleUpperCase()}
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
            <Link href='/'>
              <Typography
                variant="h6"
                component="div"
                sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
              >
                Pearl Box
              </Typography>            
            </Link>            
          </Box>


          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItems.map((item) => (
              <Button key={item} sx={{ color: '#fff', marginInlineEnd: '2vw' }} href={item.toLowerCase() === `${pathSegment} home` ? `/${pathSegment}` : `/${pathSegment}/${item.toLowerCase()}`}>
                {item}
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
            {subcategories?.map((item) => (
              
              <Grid item key={item._id}>
                <Button  sx={{ color: '#fff', fontSize: '.5rem', padding:0 }} href={`/${pathSegment}/categories/category/${item.slug.current}`} >
                  {item.name}
                </Button>
              </Grid>

            ))}
            </Grid>

    


      </AppBar>
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

NavBar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default NavBar