import React from 'react'
import styled from 'styled-components';
import { Block } from '../../stylesComponents/block'
import TypeComponent from '../../mainComponents/listItems/typeComponent'
import db from '../../storage/database'


function ComponentsList(props) {
    const { components } = props
    console.log(components)

    const types = db.getTypesComponents()

    return (
        <BlockWoBorder>
            <div>A components list</div>
            <TypeComponent manufacturer={components} types={types}/>
        </BlockWoBorder>
    )
}


export default ComponentsList

const BlockWoBorder = styled(Block)`
    border: none;
`