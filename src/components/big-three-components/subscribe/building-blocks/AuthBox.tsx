import { Button } from '@mui/material'
import { grey, red } from '@mui/material/colors'
import React from 'react'

const AuthBox = ({ handleSignup, handleSignin, loggedIn, handleSignOut }) => {
    return (

        <div   className='sm:w-1/5 hidden sm:block'>

            {
                loggedIn ?
                    <div>

                        <Button onClick={(e)=> handleSignOut(e)} variant='outlined' sx={{borderColor: red[500], color: red[500]}} className='hidden'>
                            Signout
                        </Button>
                                                                
                    </div>
                :

                    <div className=' sm:flex gap-3 justify-end hidden '>

                        <Button onClick={(e)=>handleSignin(e)} variant='contained' sx={{color:grey[900]}} className='gradient-button'>
                            Login
                        </Button>

                        <Button onClick={(e)=>handleSignup(e)} variant='outlined' sx={{border: 'none', color:grey[900]}} className='gradient-button-signup'>
                            Signup
                        </Button>

                    </div>

            }



        </div>

    )
}

export default AuthBox