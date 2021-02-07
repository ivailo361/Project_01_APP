import React, { useState } from 'react'
import styled from 'styled-components';
import useAuth from '../../models/auth'

function IsLoadingHOC(WrappedComp, loadingMessage) {
    function HOC(props) {
        const [isLoading, setLoading] = useState(false)
        const { isLoggedIn } = useAuth()

        const setLoadingState = isComponentLoading => {
            setLoading(isComponentLoading)
        }

        if (!isLoggedIn) {
            return <WrappedComp {...props} isLoading={isLoading} setLoading={setLoadingState} />
        }

        return (
            <>
                {isLoading && <Img src="/Spin-1s-200px.svg" alt={loadingMessage}/>}
                <WrappedComp {...props} isLoading={isLoading} setLoading={setLoadingState} />
            </>
        )
    }

    return HOC
}

export default IsLoadingHOC

const Img = styled.img`
    height: 7rem;

`
