import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getData } from '../../models/fetcher'
import db from '../../storage/database'
import TypeComponent from '../../mainComponents/listItems/typeComponent'
import { Block } from '../../stylesComponents/block'
import { ErrorMsg, } from '../../mainComponents/messenger/message'
import useNotifications from '../../models/notification'



function ManufacturerStock() {
    const { manufacturer } = useParams()
    const [data, setData] = useState(db.getComponentsData())
    const { error, errorMessage, closeMessage } = useNotifications()

    const manNumber = db.getManufacturerFullData(manufacturer)

    useEffect(() => {
      
        if (data.length === 0) {
            getData('/api/edit')
                .then((res) => {
                    db.setComponentsData(res)
                    setData(res)
                })
                .catch(e => errorMessage(e.message))
        }
    }, [data.length, errorMessage])


    const dataDB = data.filter(x => {
        if (manNumber === 'ALL') {
            return x
        } else {
            return x.manufacturer.toString() === manNumber || x.manufacturer.toString() === undefined
        }
    })


    return (
        < div >
            <div>THIS IS A WAREHOUSE STOCK PER MANUFACTURER PAGE</div>
            <div>The chosen warehouse is from <b>{manufacturer || 'all'}</b></div>
            {
                error !== null
                    ? <ErrorMsg message={error} closeMessage={closeMessage} />
                    : <Block>
                        <TypeComponent dataDB={dataDB} />
                    </Block>
            }
        </div >

    )
}

export default ManufacturerStock


