import React from 'react'
import { useParams } from 'react-router-dom'
import db from '../../storage/database'


function ServerModel(props) {
    const { model } = useParams()
    const { brand } = props
    const components = db.getComponentsData()
    const manufacturerList = db.getManufacturerConfigList()
    console.log(model, brand)
    console.log(components)

    const correctManufacturer = manufacturerList
        .reduce((acc, val) => {
            if(val.name.toString() === brand.toString()) {
                console.log('inside')
                return acc + val.sap
            }
            return acc
        }, '')
    console.log(correctManufacturer)
    let selected = components.reduce((acc, val) => {

    }, [])

    return (
        <div>
            <h1>THIS IS A MANUFACTURER CONFIGURATOR PAGE</h1>
            <div>Server model: <b>{model || 'all'}</b></div>
            <div>


            </div>
        </div>
    )
}

export default ServerModel