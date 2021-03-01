import React, { useState } from 'react'
import styled from 'styled-components';


function IsLoadingHOC(WrappedComp, loadingMessage) {
    function HOC(props) {
        const [isLoading, setLoading] = useState(false)


        const setLoadingState = isComponentLoading => {
            setLoading(isComponentLoading)
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
    position: absolute;
    height: 6rem;
`

