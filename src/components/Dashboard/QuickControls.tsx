import { Box, Button, ButtonGroup, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import React from 'react'

const QuickControls = () => {

  return (
    <Box sx={{bgcolor: grey[900], borderRadius: '5px'}} className="py-6 h-full">
      <div className='flex justify-evenly items-center'>
        
        <div className='flex flex-col justify-center items-center gap-6'>

          <div>
            <Typography variant='h3' sx={{fontSize: '2rem'}} className='gradient-text-two'>
              Blog Actions
            </Typography>
          </div>
          <ButtonGroup
          orientation="vertical"
          aria-label="vertical contained button group"
          variant="contained"
          >
          <Button>
            Create
          </Button>
            <Button>
              Update/Delete
            </Button>
          </ButtonGroup>
        </div>
        
        <div className='flex flex-col justify-center items-center gap-6'>

          <div>
            <Typography variant='h3' sx={{fontSize: '2rem'}} className='gradient-text-two'>
              Category Actions
            </Typography>
          </div>
          <ButtonGroup
          orientation="vertical"
          aria-label="vertical contained button group"
          variant="contained"
          >
          <Button>
            Create
          </Button>
            <Button>
              Update/Delete
            </Button>
          </ButtonGroup>
        </div>
        
        <div className='flex flex-col justify-center items-center gap-6'>

          <div>
            <Typography variant='h3' sx={{fontSize: '2rem'}} className='gradient-text-two'>
              Subcategory Actions
            </Typography>
          </div>
          <ButtonGroup
          orientation="vertical"
          aria-label="vertical contained button group"
          variant="contained"
          >
          <Button>
            Create
          </Button>
            <Button>
              Update/Delete
            </Button>
          </ButtonGroup>
        </div>

      </div>
    </Box>

  )
}

export default QuickControls