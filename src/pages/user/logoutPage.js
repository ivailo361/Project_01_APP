import React, { useEffect } from 'react'
import { Redirect } from 'react-router-dom'



function Logout(props) {

    useEffect(() => {
        sessionStorage.removeItem('user')
        props.logout()
    }, [props])
  
    return (
            <Redirect to="/login" />
        )
    
}

export default Logout