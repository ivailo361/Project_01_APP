import React from 'react'
import styled from 'styled-components';
import { useParams } from 'react-router-dom'
import db from '../../storage/database'
import selectCorrectComponents from '../../models/selectCompoList'
import SingleModel from './singleModel'
import ComponentsList from './componentsList'



function ServerModel(props) {
    const { model } = useParams()
    const { brand } = props
    const components = db.getComponentsData()
    const manufacturerList = db.getManufacturerConfigList()

    const correctManufacturer = manufacturerList
        .reduce((acc, val) => {
            if (val.name.toString() === brand.toString()) {
                return acc + val.sap
            }
            return acc
        }, '')

    const filteredComponents = components.filter(x => x.compatibleSrv)

    const compoList = selectCorrectComponents.bind(undefined, filteredComponents, correctManufacturer, model)

    return (
        <div>
            <h1>THIS IS A MANUFACTURER CONFIGURATOR PAGE</h1>
            <div>Server model: <b>{model || 'all'}</b></div>
            {/* <Button onClick={() => setShow(!show)}>{show ? 'Hide' : 'Show'}</Button> */}
            <Container>
                <Model>
                    <SingleModel servers={compoList(true)} />
                </Model>
                <Component>
                    <ComponentsList components={compoList(false)}/>
                </Component>
            </Container>
        </div>
    )
}

export default ServerModel

// const Button = styled.button`
//     display: block;
//     box-sizing: border-box;
//     width: 100%;
//     margin-top: 0.5rem ;
// `
const Container = styled.div`
    display: flex;
    justify-content: flex-start;
`
const Model = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 25%;
    padding: 0.5rem;
`
const Component = styled.div`
    flex-grow: 2;
    padding: 0.5rem;
`
