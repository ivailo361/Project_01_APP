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
                {isLoading && <Img src="/Spin-1s-200px.svg" alt={loadingMessage} />}
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
    z-index: 100000;
`

// const Div = styled.div`
//     &:after {
//         content: "";
//         background: url("/Spin-1s-200px.svg");
//         opacity: 1;
//         top: 0;
//         left: 0;
//         bottom: 0;
//         right: 0;
//         position: absolute;
//         z-index: -1;
//     }
//     /* display: 'block';
//     width: 100%; */
//     position: absolute;
//     width: 100px;
//     height: 100px;
//     display: block;
//   /* position: relative; */
// `

