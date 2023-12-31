import React from 'react'
import { AuthBoxContainer } from './auth-box'

const AuthBox = ({ loggedIn, user }) => {
    return (
        <AuthBoxContainer 
        user={user} 
        />
    )
}

export default AuthBox