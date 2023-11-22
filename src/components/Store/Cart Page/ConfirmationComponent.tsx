import { Button, ButtonGroup } from '@mui/material'
import React from 'react'

const ConfirmationComponent = ({handleBack}) => {
  return (
    <div>
            <Button className='' onClick={handleBack}>
                Back
            </Button>
    </div>
  )
}

export default ConfirmationComponent