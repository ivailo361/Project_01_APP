import React, { useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import db from '../../storage/database'



function Logout(props) {

    useEffect(() => {
        sessionStorage.removeItem('user')
        db.setComponentsData([])
        db.setTypesComponents([])
        db.setManufacturerList([])
        props.logout()
    }, [props])
  
    return (
            <Redirect to="/login" />
        )
    
}

export default Logout