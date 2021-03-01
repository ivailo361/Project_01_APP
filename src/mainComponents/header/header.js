import React, { useEffect, useContext } from 'react'
import ListItems from '../listItems/navigation'
import styled from 'styled-components';
import { authContext } from '../../models/context'

const headerList = (type) => {

    let header = []
    switch (type) {
        case 'guest':
            header = ['Stock', 'Configurator', 'Logout',]
            break
        case 'admin':
            header = ['Edit', 'Stock', 'Configurator', 'Logout',]
            break
        default:
            header = ['Stock', 'Configurator', 'Register', 'Login',]
    }
    return header
}

function Header() {
    const auth = useContext(authContext)
    const userData = JSON.parse(sessionStorage.getItem('user'))
    const { user, type } = userData || {}

    useEffect(() => {
        console.log(user)

    }, [auth])

    return (
        <HeaderDiv>
            <Button onClick={() => window.location.assign('/Stock')}>
                <Img src="/ALSO-Holding-AG.png" /*width="80" height="80" style={{ color: "black", filter: "invert(100%) sepia(0%) saturate(0%) hue-rotate(360deg) brightness(102%) contrast(102%)" }} */ alt=""></Img>
            </Button>
            {user 
                ? <Span>Welcome {user}</Span>
                : null 
            }
            <Nav >
                <ListItems nav={headerList(type)} />
            </Nav>
        </HeaderDiv>
    )
}

export default Header


const HeaderDiv = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
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
const Span = styled.span`
    text-align: center;
    /* display: inline-block; */
`
const Button = styled.button`
    &:hover {
        cursor: pointer;
    }
    display: block;
    border-style: none;
`
