import { Alert, AlertTitle } from '@mui/material'
import React from 'react'

const SubscriberAlerts = ({
    values, subscriber
}) => {
    return (
        <div className='flex flex-col w-full sm:w-3/4 p-0'>
            {
                values.error  ?
                    <Alert severity="error">
                        <AlertTitle>Error</AlertTitle>
                        {values.errorMessage} {subscriber.first_name}. <strong>Please feel free to try again.</strong>
                    </Alert>
                    : null
            }
            {
                values.success  ?
                    <Alert severity="success">
                        <AlertTitle>Success</AlertTitle>
                        {values.successMessage} {subscriber.first_name}. <strong>We&apos;re happy you&apos; here! </strong>
                    </Alert>          
                    : null
            }
        </div>
    )
}

export default SubscriberAlerts