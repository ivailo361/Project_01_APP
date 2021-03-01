import React, { useState, createContext } from 'react'


const authContext = createContext();

// const fakeAuth = {
//     isAuthenticated: false,
//     signIn(cb) {
//         fakeAuth.isAuthenticated = true;
//         setTimeout(cb, 100); // fake async
//     },
//     signOut(cb) {
//         fakeAuth.isAuthenticated = false;
//         setTimeout(cb, 100);
//     }
// };

function useProvideAuth() {
    const [userData, setUserData] = useState(null);

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

