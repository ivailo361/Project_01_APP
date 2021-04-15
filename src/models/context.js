import React, { useState, createContext } from 'react'


const authContext = createContext();


function useProvideAuth() {
    const user = JSON.parse(sessionStorage.getItem('user'))
    const [userData, setUserData] = useState(user);

    // useEffect(() => {
    //     const userData = JSON.parse(sessionStorage.getItem('user'))
    //     setUserData(userData)
    // }, [])

    const signIn = (res, cb) => {
        sessionStorage.setItem('user', JSON.stringify(res));
        setUserData(res)
        cb()
    };

    const signOut = cb => {
        sessionStorage.removeItem('user')
        setUserData(null)
        cb()
    };

    return {
        userData,
        signIn,
        signOut
    };
}

function ProvideAuth({ children }) {
    const auth = useProvideAuth();
    return (
        <authContext.Provider value={auth}>
            {children}
        </authContext.Provider>
    );
}

export {
    ProvideAuth,
    authContext
}

