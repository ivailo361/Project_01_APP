import React, {  } from 'react'
import { useParams } from 'react-router-dom'
import db from '../../storage/database'
import TypeComponent from '../../mainComponents/listItems/typeComponent'
import { Block } from '../../stylesComponents/block'


function ManufacturerStock(props) {
    const { manufacturer } = useParams()

    const types = db.getTypesComponents()
    const manNumber = db.getManufacturerFullData(manufacturer)


    return (
        <div>
            <div>THIS IS A WAREHOUSE STOCK PER MANUFACTURER PAGE</div>
            <div>The chosen warehouse is from <b>{manufacturer || 'all'}</b></div>
            <Block>
                <TypeComponent manufacturer={manNumber ? manNumber.sap : 'ALL'} types={types} />
            </Block>
        </div>

    )
}

export default ManufacturerStock


