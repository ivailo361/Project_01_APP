import React, { useState, useEffect } from 'react'

function useAuth() {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [token, setToken] = useState('')
    const message = 'You have to login first'

    useEffect(() => {
        function checkAuth() {
            const { user } = sessionStorage
            if (user) {
                setIsLoggedIn(true)
                setToken(user)
            }
        }
        checkAuth()

        return () => {
            setIsLoggedIn(false)
            setToken('')
        }
    })


    return {
        isLoggedIn,
        token,
        message,
    }
}

export default useAuth