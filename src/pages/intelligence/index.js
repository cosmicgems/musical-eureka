import React from 'react'
import { useStateContext } from '../../../Context/StateContext'
import { Grid, Typography } from '@mui/material';

const IntelligenceHome = () => {
    const {pageName} = useStateContext();
    console.log(pageName);
    const pageTitle = pageName.slice(1);

    return (
        
        <div style={{paddingBlockStart: '5vh'}}>
            <Grid container spacing={{xs:1,md:2}}  >

                <Typography component='div' variant='h2' sx={{width: '100%', textAlign: 'center'}}>
                    Pearl Box {pageTitle.toUpperCase()}
                </Typography>

                <Grid item lg={2}>
                    Categories
                </Grid>

                <Grid item lg={10}>
                    Featured Blog
                </Grid>
                
            </Grid>         
        </div>
        
      

    )
}

export default IntelligenceHome