import React, { useState } from 'react'
import styled from 'styled-components';
import { useHistory } from 'react-router-dom'
import useNotifications from '../../models/notification'
import { ErrorMsg, NotificationMsg } from '../../mainComponents/messenger/message'
import { postData } from '../../models/fetcher'
import { Label, Input, } from '../../stylesComponents/inputs'
import login from '../../stylesComponents/LogRegForm'

const initialState = {
    email: '',
    password: '',
}

function LoginPage(props) {
    const [input, setInput] = useState(initialState)
    const history = useHistory()
    const { error, notify, notifyMessage, errorMessage, closeMessage } = useNotifications()

    const handleInputChange = (event) => {
        event.preventDefault();
        setInput(input => ({ ...input, [event.target.name]: event.target.value }));
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        postData('/api/stock/login', input)
            .then(res => {
                if (res.login === 'ok') {
                    notifyMessage(`User ${res.user} was successfully login`)
                    sessionStorage.setItem('user', JSON.stringify(res));
                    props.login()
                    setTimeout(() => {
                        history.push('/Stock')
                    }, 2000)
                }
            })
            .catch(e => {
                errorMessage(e.message)
            })
    }


    return (
        <login.OuterForm>
            {error ? <ErrorMsg message={error} closeMessage={closeMessage} /> : null}
            {notify ? <NotificationMsg message={notify} closeMessage={() => closeMessage('notify', '/stock')} /> : null}
            <login.Header>Sign in to server config</login.Header>
            <login.LoginForm onSubmit={handleSubmit}>
                <login.InnerDiv >
                    <Label>Email</Label>
                    <Input name='email' type='email' value={input.email || ''} onChange={handleInputChange}></Input>
                </login.InnerDiv>
                <login.InnerDiv>
                    <Label>Password</Label>
                    <Input name='password' type='password' value={input.password || ''} onChange={handleInputChange}></Input>
                </login.InnerDiv>
                <login.InnerDiv>
                    <login.Sign type='submit'>Sign</login.Sign>
                </login.InnerDiv>
            </login.LoginForm>
        </login.OuterForm>
    )
}

export default LoginPage

// const OuterForm = styled.div`
//     display: flex;
//     flex-direction: column;
//     align-items: center;
// `
// const login.InnerDiv = styled.div`
//     padding-bottom: 1.3rem;
// `

// const Header = styled.div`
//     margin: 2rem 0 1.3rem 0;
//     font: 400 24px/1.4 Arial;
// `
// const login.LoginForm = styled.form`
//     height: auto;
//     background-color: #f6f8fa;
//     padding: 1.3rem 1.3rem 0 1.3rem;
//     border: 1px solid lightgrey;
//     border-radius: 0.3rem;
// `

// const Sign = styled.button`
//     width: 100%;
//     height: 1.6rem;
//     border: 1px solid #2f8146; 
//     border-radius: 0.3rem;
//     background-color: #2ea44f;
//     color: white;
//     font: 16px Arial;

// `