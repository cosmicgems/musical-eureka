import React, { PropsWithChildren } from 'react'

const AccountPageWrapper = ({
    children,

}: PropsWithChildren
) => {
    return (
        <div className='h-full'>
            {children}
        </div>
    )
}

export default AccountPageWrapper