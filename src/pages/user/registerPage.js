import React, { useState } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import useNotifications from '../../models/notification'
import { ErrorMsg, NotificationMsg } from '../../mainComponents/messenger/message'
import { postData } from '../../models/fetcher'

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
        <div>
            {error ? <ErrorMsg message={error} closeMessage={closeMessage} /> : null}
            {notify ? <NotificationMsg message={notify} closeMessage={() => closeMessage('notify', location)} /> : null}
            <h1>Register Page</h1>
            <form onSubmit={handleSubmit}>
                <div >
                    <label>Email</label>
                    <input name='email' type='email' value={input.email || ''} onChange={handleInputChange}></input>
                </div>
                <div>
                    <label>Password</label>
                    <input name='password' type='password' value={input.password || ''} onChange={handleInputChange}></input>
                </div>
                <div>
                    <label>Re-password</label>
                    <input name='repassword' type='password' value={input.repassword || ''} onChange={handleInputChange}></input>
                </div>
                <div>
                    <button type='submit'>Register</button>
                </div>
            </form>
        </div>
    )
}

export default RegisterPage