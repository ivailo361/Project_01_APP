import React, { useEffect, useContext } from 'react'
import { Redirect } from 'react-router-dom'
import db from '../../storage/database'
import { authContext } from '../../models/context'



function Logout() {
    const auth = useContext(authContext)

    useEffect(() => {
        auth.signOut(() => {
            db.setComponentsData([])
            db.setTypesComponents([])
            db.setManufacturerList([])
        })
    }, [auth])
  
    return (
            <Redirect to="/login" />
        )
    
}

export default Logout