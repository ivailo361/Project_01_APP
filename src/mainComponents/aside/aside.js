import React from 'react'
import ListItems from '../listItems/navigation'
import styled from 'styled-components';
// import type from '../../storage/database'
// import { useLocation } from 'react-router-dom'


function Aside(props) {
    const manufacturers = props.list 

    return (
        <AsideComp>
            {manufacturers.length !== 0 
                ? <Nav >
                    <ListItems nav={manufacturers} theme={props.theme} />
                </Nav>
                : null
            } 
        </AsideComp>
    )
}

export default Aside

const AsideComp = styled.div`
    flex-basis: 10%;
    border: 2px solid lightgrey; 
    border-radius: 0.3rem;
`
const Nav = styled.nav`
    margin: 1.5rem 0.5rem 0.5rem 0.5rem;
    height: 100%;
    display: flex;
    flex-flow: column wrap;
    justify-content: flex-start;

`