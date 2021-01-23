import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import useNotifications from '../../models/notification'
import { ErrorMsg, NotificationMsg } from '../../mainComponents/messenger/message'
import { postData } from '../../models/fetcher'

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
        <div>
            {error ? <ErrorMsg message={error} closeMessage={closeMessage} /> : null}
            {notify ? <NotificationMsg message={notify} closeMessage={() => closeMessage('notify', '/stock')} /> : null}
            <h1>Login Page</h1>
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
                    <button type='submit'>Submit</button>
                </div>
            </form>
        </div>
    )
}

export default LoginPage