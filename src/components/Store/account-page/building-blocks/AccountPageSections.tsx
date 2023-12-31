import React from 'react'
import { accMenuItems } from 'accountPageMenu'
import { Button, ButtonGroup } from '@mui/material'

const AccountPageSections = ({
    handleMenuClick
}) => {
    return (
        <ButtonGroup size='large' variant='contained' orientation='vertical' className='w-full md:min-h-[55vh] rounded-l-none '>
            {
                accMenuItems.map(({name}) => (
                    <Button onClick={() => { handleMenuClick(name)}} className='grow rounded-l-none justify-start'>{name}</Button>
                ))
            }
        </ButtonGroup>
    )
}

export default AccountPageSections