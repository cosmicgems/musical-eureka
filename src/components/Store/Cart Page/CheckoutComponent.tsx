import { useSession } from 'next-auth/react';
import React, { useState } from 'react'
import { Box, Stepper, Step, StepLabel, Typography, TextField } from '@mui/material';
import ShippingComponent from './ShippingComponent';
import PaymentComponent from './PaymentComponent';
import ConfirmationComponent from './ConfirmationComponent';
import { grey } from '@mui/material/colors';

interface Session {
    data:{
        user:{
            about: string;
            confirmed_account: boolean;
            createdAt: Date;
            email: string;
            first_name: string;
            last_name: string;
            password: string;
            photo: string;
            role: number;
            updatedAt: Date;
            username: string;
            verification_token: string;
            verification_token_expiration: string;
            _id: string;
            
        }      
    },
    status: string;
  
}

const steps = [
  'Shipping',
  'Payment',
  'Confirmation',
];


const CheckoutComponent = ({cartItems, guestCheckout, memberCheckout}) => {
    const {data:session, status} = useSession() as Session;
    const [step, setStep] = useState<number>(0)

    return (
        <div className='flex  w-full'>
            <div className='flex w-full'>
                <Box className="flex flex-col gap-12 w-3/5 items-center">
                    <Stepper className='w-full' activeStep={step} alternativeLabel>
                        {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                        ))}
                    </Stepper>
                    <Box sx={{ bgcolor: grey[900]}} className=" w-2/3 rounded">
                        {
                            step === 0 ?
                                <>
                                    <ShippingComponent handleNext={()=>{setStep(step + 1)}} />
                                </>
                            :
                            step === 1 ?
                                <>
                                    <PaymentComponent handleBack={()=>{setStep(step - 1)}} handleNext={()=>{setStep(step + 1)}} />
                                </>
                            :
                            step === 2 ?
                                <>
                                    <ConfirmationComponent handleBack={()=>{setStep(step - 1)}} />
                                </>
                            :
                            <Typography variant='h4' className='gradient-text-home' component="div">
                                Order Confirmation
                            </Typography>
                        }
                    </Box>
                </Box>                
            </div>

        </div>
    )
}

export default CheckoutComponent