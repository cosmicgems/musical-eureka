import { Button, TextField } from '@mui/material'
import { grey } from '@mui/material/colors'
import React from 'react'

const SubscriberInput = ({ 
    subscriber, 
    handleSubscribe, 
    setSubscriber,
    blank
}) => {
    return (
        <>
            <div 
            className='flex sm:w-1/2 justify-center'
            >
                <TextField 
                    size='small' 
                    fullWidth 
                    variant='outlined' 
                    sx={
                        {
                            bgcolor:grey[50], 
                            borderTopLeftRadius: '5px', 
                            borderBottomLeftRadius: "5px", 
                            borderTopRightRadius: "0px", 
                            borderBottomRightRadius:"0px"
                            }
                        } 
                    label="Email" 
                    className='' 
                    value={subscriber.email} 
                    onChange={(e)=> {setSubscriber({...subscriber,email:e.target.value})}} 
                    />
                    
                        <Button 
                        className='gradient-button' 
                        onClick={(e)=>handleSubscribe(e)} 
                        variant='contained' 
                        sx={
                            {
                                borderTopLeftRadius:0, 
                                borderBottomLeftRadius:0, 
                                color:grey[900]
                            }
                        }
                        >
                            Subscribe
                        </Button>

            </div>

            {

                !blank &&

                    <div className='sm:w-1/2 flex gap-3 pt-3'>
                        <TextField 
                            size='small' 
                            fullWidth 
                            variant='outlined' 
                            sx={
                                {
                                    bgcolor:grey[50], 
                                    borderTopLeftRadius: '5px', 
                                    borderBottomLeftRadius: "5px", 
                                    borderTopRightRadius: "0px", 
                                    borderBottomRightRadius:"0px"
                                }
                            } 
                            label="First Name" 
                            className='' 
                            value={subscriber.first_name} 
                            onChange={
                                (e)=> {
                                    setSubscriber({...subscriber,first_name:e.target.value})
                                }} 
                            />
                        <TextField 
                            size='small' 
                            fullWidth 
                            variant='outlined' 
                            sx={
                                {
                                    bgcolor:grey[50], 
                                    borderTopLeftRadius: '5px', 
                                    borderBottomLeftRadius: "5px", 
                                    borderTopRightRadius: "0px", 
                                    borderBottomRightRadius:"0px"
                                }
                            } 
                            label="Last Name" 
                            className='' 
                            value={subscriber.last_name} 
                            onChange={
                                (e)=> {
                                    setSubscriber({...subscriber,last_name:e.target.value})
                                }} 
                            />
                    </div> 

            }

        </>

    )
}

export default SubscriberInput