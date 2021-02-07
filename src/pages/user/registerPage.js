import React, { useState } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import styled from 'styled-components';
import useNotifications from '../../models/notification'
import { ErrorMsg, NotificationMsg } from '../../mainComponents/messenger/message'
import { postData } from '../../models/fetcher'
import { Label, Input, } from '../../stylesComponents/inputs'
import login from '../../stylesComponents/LogRegForm'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBuffer } from '@fortawesome/free-brands-svg-icons'

const initialState = {
    email: '',
    password: '',
    repassword: ''
}


function RegisterPage() {
    const [input, setInput] = useState(initialState)
    const location = useLocation()
    const history = useHistory()
    const { error, notify, notifyMessage, errorMessage, closeMessage } = useNotifications()

    const handleInputChange = (event) => {
        event.preventDefault();
        if (event.target.name === 'password') {
            verificationInputData(input)
        }
        setInput(input => ({ ...input, [event.target.name]: event.target.value }));
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const answer = verifySubmitData(input)
        if (answer.message === 'ok') {
            postData('/api/stock/register', input)
                .then(res => {
                    if (Number(res.insertedCount) === 1) {
                        notifyMessage(`${res.user} has been successfully registered`)
                        setTimeout(() => {
                            history.push('/login')
                        }, 3000)
                    } else {
                        errorMessage('something went wrong please try again later')
                    }
                })
                .catch(e => {
                    errorMessage(e.message)
                })
        } else {
            errorMessage(answer.message)
        }
    }

    const verificationInputData = (input) => {
        if (input.password.length < 3) {
            errorMessage('The password must be more than 3 symbols')
            return
        }
        return closeMessage('error')
    }

    const verifySubmitData = (input) => {
        if (input.password !== input.repassword) {
            return { message: 'Repassword must match Password input'}
        }
        return { message: 'ok' }  
    }


    return (
        <login.OuterForm>
            {error ? <ErrorMsg message={error} closeMessage={closeMessage} /> : null}
            {notify ? <NotificationMsg message={notify} closeMessage={() => closeMessage('notify', location)} /> : null}
            <Icon><FontAwesomeIcon icon={faBuffer}/></Icon>
            <login.Header>Register Page</login.Header>
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
                    <Label>Re-password</Label>
                    <Input name='repassword' type='password' value={input.repassword || ''} onChange={handleInputChange}></Input>
                </login.InnerDiv>
                <login.InnerDiv>
                    <login.Sign type='submit'>Register</login.Sign>
                </login.InnerDiv>
            </login.LoginForm>
        </login.OuterForm>
    )
}

export default RegisterPage

const Icon = styled.div`
    margin-top: 1.5rem;
    width: auto;
    font-size: 3rem;
    color: dimgray;
`