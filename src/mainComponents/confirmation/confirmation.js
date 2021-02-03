import React from 'react'
import { DeleteButton, AddButton } from '../../stylesComponents/inputs'
import styled from 'styled-components';

function ConfirmRequest(props) {
    const { confirm, cancel, message } = props

    return (
        <Screen>
            <Message>
                <div>{message}</div>
                <Div>
                    <AddButton type='button' onClick={cancel} value="Cancel" />
                    <DeleteButton type='button' onClick={confirm} value="Delete" />
                </Div>
            </Message>
        </Screen>
    )
}

export default ConfirmRequest

const Screen = styled.div`
    position:fixed;
    top:0;
    left:0;
    z-index: 1000;
    width: 100%;
    height: 100%;
    background:rgba(255,255,255,0.5);
    

`

const Message = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    border: solid 2px red;
    border-radius: 0.3rem;
    padding: 1rem;
`

const Div = styled.div`
    display: flex;
    justify-content: space-evenly;
    padding-top: 1rem;
`

