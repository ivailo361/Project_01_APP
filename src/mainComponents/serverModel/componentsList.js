import React from 'react'
import styled from 'styled-components';
import { Block } from '../../stylesComponents/block'
import TypeComponent from '../../mainComponents/listItems/typeComponent'


function ComponentsList(props) {
    const { components } = props

    return (
        <BlockWoBorder>
            <div>A components list</div>
            <TypeComponent dataDB={components} dontShow={true}/>
        </BlockWoBorder>
    )
}

export default ComponentsList

const BlockWoBorder = styled(Block)`
    border: none;
`