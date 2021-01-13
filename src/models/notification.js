import { useState } from 'react'
import { useHistory } from 'react-router-dom'

const useNotifications = () => {
    const [error, setError] = useState(null)
    const [notify, setNotify] = useState(null)
    const history = useHistory()

    const closeMessage = (type, path) => {
        const obj = {
            error: () => {
                return setError(null)    
            },
            notify: (path) => {
                setNotify(null)
                return history.push(path) 
            }
        }
        return obj[type](path)    
    }

    const errorMessage = (err) => {
        setError(err)
    }

    const notifyMessage = (text) => {
        setNotify(text)
    }

    return {
        error,
        notify,
        errorMessage,
        notifyMessage,
        closeMessage
    }
}

export default useNotifications