import React from 'react'
import ListItems from '../listItems/navigation'
import styled from 'styled-components';

const headerList = (loggedIn) => {
    const guest = [ 'Edit', 'Stock', 'Configurator', 'Register', 'Login', ]

    const user = [ 'Stock', 'Configurator', 'Add category', 'Edit material', 'Login',]

    return loggedIn ? user : guest 
}

function Header() {

        return (
            <HeaderDiv>
                <Button onClick={() => window.location.assign('/Stock')}>
                    <Img src="/ALSO-Holding-AG.png" /*width="80" height="80" style={{ color: "black", filter: "invert(100%) sepia(0%) saturate(0%) hue-rotate(360deg) brightness(102%) contrast(102%)" }} */alt=""></Img>
                </Button>
                <Nav >
                    <ListItems nav={headerList()} />
                </Nav>
            </HeaderDiv>
        )
    }

export default Header


const HeaderDiv = styled.div`
    display: flex;
    justify-content: space-between;
    box-sizing: content-box;
    width: 98%;
    margin: auto;
    height: auto;
    border: 2px solid lightgrey;
    border-radius: 0.3rem;
    background-color: #99e087;
`
const Nav = styled.nav`
    display: flex;
    align-items: center;
`
const Img = styled.img`
    display: block;
    height: 100%;
`

const Button = styled.button`
    &:hover {
        cursor: pointer;
    }
    display: block;
    border-style: none;
`
