import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { useParams } from 'react-router-dom'
import db from '../../storage/database'
import selectCorrectComponents from '../../models/selectCompoList'
import SingleModel from './singleModel'
import ComponentsList from './componentsList'
import InputButton from '../../stylesComponents/button'


function ServerModel(props) {
    const { model } = useParams()
    const { brand } = props
    const components = db.getComponentsData()
    const manufacturerList = db.getManufacturerConfigList()

    const [outData, setOutData] = useState([])
    const [showZero, setShowZero] = useState(false)

    const [marked, setMarked] = useState([])
    const [filtered, setFiltered] = useState([])
    const allComponents = db.getComponentsData()

    useEffect(() => {
        let filtered = marked.map(x => {
            return allComponents.find(y => y.sapNum === x)
        })
        setFiltered(filtered)
        console.log(marked)
    }, [marked])

    useEffect(() => {
        setMarked([])
    }, [model])

    useEffect(() => {
        let filteredComponents = []
        if (!showZero) {
            filteredComponents = components.filter(x => x.compatibleSrv)
        } else {
            filteredComponents = components.filter(x => x.compatibleSrv && x.qty > 0)
        }
        setOutData(filteredComponents)
    }, [showZero])
    
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
