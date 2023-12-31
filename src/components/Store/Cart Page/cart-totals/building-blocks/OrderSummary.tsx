import { Box, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import React from 'react'
import { User } from 'src/utility/types/Session'

const OrderSummary = ({session, itemsCount}: { session: any, itemsCount: number} ) => {
    return (
        <Box className="px-3 py-1 md:rounded flex gap-3 justify-between" sx={{bgcolor: grey[900]}}>
                      <div className='flex gap-1'>
                        <Typography variant='body1' component="div" className='gradient-text' sx={{}}>
                          Member:
                        </Typography>
                          {
                            session?.user !== null && session?.user !== undefined ?
                              <div>
                                <Typography variant='body1' component="div" className='font-bold' sx={{color:grey[50]}}>
                                  {session?.user.first_name} {session?.user.last_name}
                                </Typography>
                              </div>
                            :
                            <Typography variant='body1' component="div" className='gradient-text-three' sx={{color:grey[50]}}>
                              Not signed in
                            </Typography>
                          }
                      </div>
                      <div className='flex gap-1'>
                        <Typography variant='body1' component="div" className='gradient-text' sx={{}}>
                          Items in Cart:
                        </Typography>
                        <Typography variant='body1' component="div" className='font-bold' sx={{color:grey[50]}}>
                          {itemsCount}
                        </Typography>
                      </div>
        </Box>
    )
}

export default OrderSummary