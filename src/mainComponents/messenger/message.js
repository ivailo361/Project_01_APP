import React from 'react'
import styled from 'styled-components'
import db from '../../storage/database'

const cookMessage = (message) => {
    let msg = ''
    
    if (typeof (message) === 'object') {
        for (const key in message) {
            msg = `${msg}\n${key}: ${message[key]}`
        }
    } else {
        msg = message
    }
    return msg
} 

function NotificationMsg(props) {
    const { message, link } = props
    const msg = cookMessage(message)
    const manList = db.getManufacturerConfigList()
                      .find(x => Number(x.sap) === Number(link)) 
    const path = manList !== undefined ? `/stock/${manList.name}` : '/stock'                

    // setTimeout(() => {
    //     // history.push('/stock');
    //     window.location.assign(link)
    //     // props.closeMessage('notify')
    // }, 2000)

    return (
        <Notification>
            <Div>{msg}</Div>
            <NotifyButton type='button' onClick={() => props.closeMessage('notify', path)}>X</NotifyButton>
        </Notification>
    )
}


function ErrorMsg(props) {
    const { message } = props

    const msg = cookMessage(message)

    return (
        <Message>
            <Div>{msg}</Div>
            <Button type='button' onClick={() => props.closeMessage('error')}>X</Button>
        </Message>
    )
}

const Div = styled.div`
    width: 80%;
    font-size: medium;
    margin-right: auto;
`

const Button = styled.button`
    &:hover {
        background-color: #FF6666
    }
    &:active {
        box-shadow: inset -2px -2px 3px rgba(255, 255, 255, 40),
                inset 2px 2px 3px rgba(0, 0, 0, .6);
    }
    display: block;
    background-color: inherit;
    border: 0;
    color: white;
    font-size: medium;
    padding: 0 .3rem;
    outline: none;

`

const Message = styled.div`
    position: absolute;
    z-index: 100;
    right: 0;
    top: 0;
    display: flex;
    align-items: flex-start;
    color: white;
    font-size: larger;
    background-color: #EC6A6A;
    border-radius: 0.3rem;
    width: 400px;
    padding: .3rem;
    right: 1%;
    /* margin: .5rem auto; */
    /* margin-left: 50%; */
    /* transform: translateX(-50%); */
`

const Notification = styled(Message)`
    background-color: #7af1a5;
`

const NotifyButton = styled(Button)`
    &:hover {
        background-color: #457e59;
    }
`
export {
    ErrorMsg,
    NotificationMsg,
}