import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { useRouteMatch } from 'react-router-dom'
import db from '../../storage/database'
import selectCorrectComponents from '../../models/selectCompoList'
import SingleModel from './singleModel'
import ComponentsList from './componentsList'
import InputButton from '../../stylesComponents/button'


function ServerModel(props) {
    const match = useRouteMatch('/Configurator/:brand/:model')
    const model = match ? match.params.model : 'ALL'
    const manNumber = db.getManufacturerFullData(props.brand)
    
    const components = db.getComponentsData()
    
    const [outData, setOutData] = useState([])
    const [showZero, setShowZero] = useState(false)
    
    const [marked, setMarked] = useState([])
    const [filtered, setFiltered] = useState([])

    const compoList = selectCorrectComponents.bind(undefined, outData, model)
    
    useEffect(() => {
        let filteredComponents = []
        if (!showZero) {
            filteredComponents = components.filter(x => x.compatibleSrv && +x.manufacturer === +manNumber)
        } else {
            filteredComponents = components.filter(x => x.compatibleSrv && x.qty > 0 && +x.manufacturer === +manNumber)
        }
        setOutData(filteredComponents)
        setFiltered(compoList(false))
    }, [showZero, components, manNumber])

    useEffect(() => {
        let filtered = marked.map(x => {
            return components.find(y => y.sapNum === x)
        })
        setFiltered(filtered)
    }, [marked, components])

    useEffect(() => {
        setMarked([])
    }, [model])

    const selectedComp = {
        add: (id) => {
            setMarked(state => [...state, id])
        },
        remove: (id) => {
            let cleared = marked.filter(x => x !== id)
            setMarked(cleared)
        },
        isSelected: (id) => {
            return marked.indexOf(id) > -1;

        }
    }

    const removeZeroComp = () => {
        setShowZero(state => !state)
    }

    const ChangeButton = () => <InputButton theme={showZero ? 'show' : 'hide'} type='button' onClick={removeZeroComp} value={showZero ? 'Show 0' : 'Hide 0'}></InputButton>

    return (
        <div>
            <h1>THIS IS A MANUFACTURER CONFIGURATOR PAGE</h1>
            <Div>
                <div>Server model: <b>{model || 'all'}</b></div>
            </Div>

            <Container>
                <Model>
                    <SingleModel servers={compoList(true)} selectedComp={selectedComp} />
                </Model>
                <Component>
                    <ComponentsList components={compoList(false)} changeButton={<ChangeButton/>} filtered={filtered} selectedComp={selectedComp} />
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

const Div = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`
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
