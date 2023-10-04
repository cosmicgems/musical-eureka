import { Box, Button, ButtonGroup, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import React from 'react'

const QuickControls = () => {

  return (
    <Box sx={{bgcolor: grey[900], borderRadius: '5px'}} className="py-6 h-full">
      <div className='flex flex-col sm:flex-row gap-12 justify-evenly items-stretch p-3'>
        
        <div className='flex flex-col justify-center  gap-6 '>

          <div>
            <Typography variant='h3' sx={{fontSize: {xs: "1.75rem",md:'2rem'}}} className='gradient-text-two text-center'>
              Blog Actions
            </Typography>
          </div>
          <ButtonGroup
          orientation="vertical"
          aria-label="vertical contained button group"
          variant="contained"
          >
          <Button href={`/admin/dashboard/articles/article/create`}>
            Create
          </Button>
            <Button href={`/admin/dashboard/articles/modify`} >
              Update/Delete
            </Button>
          </ButtonGroup>
        </div>
        
        <div className='flex flex-col justify-center  gap-6 '>

          <div>
            <Typography variant='h3' sx={{fontSize: {xs: "1.75rem",md:'2rem'}}} className='gradient-text-two text-center'>
              Identifiers Actions
            </Typography>
          </div>
          <ButtonGroup
          orientation="vertical"
          aria-label="vertical contained button group"
          variant="contained"
          >
              <Button href={`/admin/dashboard/identifiers/create`} >
                Create
              </Button>
              <Button href={`/admin/dashboard/identifiers/modify/`} >
                Update/Delete
              </Button>
          </ButtonGroup>
        </div>
        
        <div className='flex flex-col  justify-center gap-6  '>
          
            <div>
              <Typography variant='h3' sx={{fontSize: {xs: "1.75rem",md:'2rem'}}} className='gradient-text-two text-center'>
                Featured Post Actions
              </Typography>
            </div>
            <div className='flex flex-col grow justify-center '>
              <ButtonGroup
              orientation="vertical"
              aria-label="vertical contained button group"
              variant="contained"
              className=''
              >
              <Button href={`/admin/dashboard/articles/featured-posts/manage`} >
                Manage Post
              </Button>
              </ButtonGroup>               
            </div>
          

        </div>

      </div>
    </Box>

  )
}

export default QuickControls