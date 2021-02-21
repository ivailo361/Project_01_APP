import React, { useEffect, useState } from 'react'
import db from '../../storage/database'
import TypeList from './typeList'
import { Block } from '../../stylesComponents/block'

function TypeComponent(props) {
    const [ show, setShow ] = useState(false)
    const { dataDB, selectedComp, dontShow, checkBoxName } = props
    const types = db.getTypesComponents()

    useEffect(() => {
        if (dataDB.length > 0) {
            setShow(true)
        }
    }, [dataDB])


    const correctedTypes = () => {
        if (dontShow) {
            return types.filter(x => {
                if (x.type === "Server" || x.type === "undefined") {
                    return false
                }
                return true
            })
        }
        return types
    }

    const list = correctedTypes().map(x => {
        const matchComp = dataDB.filter(y => {
            if (y.type === x.type) {
                return y
            } else if (x.type === 'undefined' && y.type === undefined) {
                return y
            }
            return false
        })

        return (
            <Block key={x._id}>
                <TypeList type={x.type} comp={matchComp} selectedComp={selectedComp} checkBoxName={checkBoxName} />
            </Block>
        )
    })

    return (
        <>
            {
                show === true
                    ? list
                    : null
            }
        </>
    )
}

export default TypeComponent