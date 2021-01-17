import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import db from '../../storage/database'
import SingleModel from './singleModel'
import ComponentsList from './componentsList'
import styled from 'styled-components';


function ServerModel(props) {
    const { model } = useParams()
    const [show, setShow] = useState(false)
    const { brand } = props
    const components = db.getComponentsData()
    const manufacturerList = db.getManufacturerConfigList()
    console.log(model, brand)
    console.log(components)

    const correctManufacturer = manufacturerList
        .reduce((acc, val) => {
            if (val.name.toString() === brand.toString()) {
                return acc + val.sap
            }
            return acc
        }, '')

    console.log(correctManufacturer)

    const filteredComponents = components.filter(x => x.compatibleSrv)

    console.log(filteredComponents)

    function selectCorrectComponents(data, manufacturer, model, server) {
        if (server) {
            // let { manufacturer, compatibleSrv, type } = data
            return data.reduce((acc, val) => {
                if (Number(val.manufacturer) === Number(manufacturer) && val.compatibleSrv.indexOf(model) !== -1 && val.type === 'Server') {
                    return acc.concat(val)
                }
                else if (Number(val.manufacturer) === Number(manufacturer) && model === 'ALL' && val.type === 'Server') {
                    return acc.concat(val)
                }
                return acc
            }, [])
        } else {
            return data.reduce((acc, val) => {
                if (Number(val.manufacturer) === Number(manufacturer) && val.compatibleSrv.indexOf(model) !== -1 && val.type !== 'Server') {
                    return acc.concat(val)
                }
                else if (Number(val.manufacturer) === Number(manufacturer) && model === 'ALL' && val.type !== 'Server') {
                    return acc.concat(val)
                }
                return acc
            }, [])
        }
    }

    let serversOnly = selectCorrectComponents(filteredComponents, correctManufacturer, model, true)

    let componentsOnly = selectCorrectComponents(filteredComponents, correctManufacturer, model, true)
    // console.log(selected(true))
    // let serversOnly = selected(true)
    // let componentsOnly = selected(false)

    // let selected = components.reduce((acc, val) => {
    //     if (Number(val.manufacturer) === Number)
    // }, [])

    return (
        <div>
            <h1>THIS IS A MANUFACTURER CONFIGURATOR PAGE</h1>
            <div>Server model: <b>{model || 'all'}</b></div>
            <Button onClick={() => setShow(!show)}>{show ? 'Hide' : 'Show'}</Button>
            <Container>
                <Model>
                    <SingleModel servers={serversOnly} />
                </Model>
                <Component>
                    <ComponentsList components={componentsOnly}/>
                </Component>
            </Container>
        </div>
    )
}

export default ServerModel

const Button = styled.button`
    display: block;
    box-sizing: border-box;
    width: 100%;
    margin-top: 0.5rem ;
`
const Container = styled.div`
    display: flex;
    justify-content: flex-start;
`
const Model = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 30%;
    padding: 0.5rem;
`
const Component = styled.div`
    flex-grow: 2;
    padding: 0.5rem;
`
