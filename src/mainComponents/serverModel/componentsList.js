import React from 'react'
import styled from 'styled-components';
import { Block } from '../../stylesComponents/block'
import TypeComponent from '../../mainComponents/listItems/typeComponent'
import Download from './exportExcel'


function ComponentsList(props) {
    const { components, changeButton, filtered, selectedComp } = props

    return (
        <BlockWoBorder>
            <Header>A components list</Header>
            <Div>
                {changeButton}
                <Download filtered={filtered}/>
            </Div>
            <TypeComponent dataDB={components} selectedComp={selectedComp} dontShow={true} checkBoxName='add' />
        </BlockWoBorder>
    )
}

export default ComponentsList

const BlockWoBorder = styled(Block)`
    border: none;
    display: flex;
    align-items: stretch;
    flex-direction: column;
    padding: 0;
`
const Div = styled.div`
    align-self: center;
    display: flex;
    align-items: center;
`
const Header = styled.div`
    align-self: center;
`

