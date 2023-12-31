import React from 'react'
import UserGreetingText from './UserGreetingText'
import UserCardMobile from '@components/User/UserCardMobile'

const UserGreetingContainer = ({user}) => {
    return (
        <div>
            <UserGreetingText user={user} />

            <div className='px-3'>
                <UserCardMobile />
            </div>
            
        </div>
    )
}

export default UserGreetingContainer