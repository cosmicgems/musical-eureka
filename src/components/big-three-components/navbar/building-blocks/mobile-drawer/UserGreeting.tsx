import React from 'react'
import { UserGreetingContainer } from './user-greeting'

const UserGreeting = ({user}) => {

    return (

        <UserGreetingContainer
        user={user} 
        />
        
    )
}

export default UserGreeting