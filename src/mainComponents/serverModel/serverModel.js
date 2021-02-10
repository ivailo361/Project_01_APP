import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { useParams} from 'react-router-dom'
import db from '../../storage/database'
import selectCorrectComponents from '../../models/selectCompoList'
import SingleModel from './singleModel'
import ComponentsList from './componentsList'



function ServerModel(props) {
    const { model } = useParams()
    const { brand } = props
    const components = db.getComponentsData()
    const manufacturerList = db.getManufacturerConfigList()

    const [outData, setOutData] = useState([])
    const [showZero, setShowZero] = useState(false)

    useEffect(() => {
        let filteredComponents = []
        if (!showZero) {
            filteredComponents = components.filter(x => x.compatibleSrv)
        } else {
            filteredComponents = components.filter(x => x.compatibleSrv && x.qty > 0)    
        }
        setOutData(filteredComponents)
    }, [showZero])


    const correctManufacturer = manufacturerList
        .reduce((acc, val) => {
            if (val.name.toString() === brand.toString()) {
                return acc + val.sap
            }
            return acc
        }, '')

    

    const compoList = selectCorrectComponents.bind(undefined, outData, correctManufacturer, model)

    const removeZeroComp = () => {
        setShowZero(state => !state)
    }

    return (
        <div>
            <h1>THIS IS A MANUFACTURER CONFIGURATOR PAGE</h1>
            <div>Server model: <b>{model || 'all'}</b></div>
            <input type='button' onClick={removeZeroComp} value={showZero ? 'Show 0' : 'Hide 0'}></input>
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
    max-width: 25%;
    padding: 0.5rem;
`
const Component = styled.div`
    flex-grow: 2;
    padding: 0.5rem;
`
