import styled from 'styled-components';
import { Link } from 'react-router-dom'


const standardView = (theme) => {
    const type = {
        default: `color: black; background-color: white; margin-right: 1rem; `,
        fujitsu: `color: rgb(226,6,6); border: 2px solid #cccccc; margin-bottom: 1rem;`,
        hpe: `color: rgb(1,169,130); border: 2px solid #cccccc; margin-bottom: 1rem;`,
        dell: `color: rgb(1,126,186); border: 2px solid #cccccc; margin-bottom: 1rem;`,
        lenovo: `color: rgb(53,43,114); border: 2px solid #cccccc; margin-bottom: 1rem;`,
        all: `color: black; border: 2px solid #cccccc; margin-bottom: 1rem;`,
    }
    return type[theme] ? type[theme] : type['default']
}

const hoverView = (theme) => {
    const type = {
        default: `color: black; background-color: #cccccc; margin-right: 1rem;`,
        fujitsu: `color: white; background-color: rgb(226,6,6);`,
        hpe: `color: white; background-color: rgb(1,169,130);`,
        dell: `color: white; background-color: rgb(1,126,186);`,
        lenovo: `color: white; background-color: rgb(53,43,114);`,
        all: `color: black; background-color: #cccccc; `
    }
    return type[theme] ? type[theme] : type['default']
}

const activeLink = (marked) => {
    const type = {
        // default: `color: black; background-color: #cccccc; margin-right: 1rem;`,
        fujitsu: `color: white; background-color: rgb(226,6,6);`,
        hpe: `color: white; background-color: rgb(1,169,130);`,
        dell: `color: white; background-color: rgb(1,126,186);`,
        lenovo: `color: white; background-color: rgb(53,43,114);`,
        all: `color: black; background-color: #cccccc; `
    }
    return type[marked] ? type[marked] : false
}

const configuratorView = (conf) => {
    if (conf === 'true') {
        return (
            `width: 150px;
            height: 150px;
  
            `
        )
    }
}


const Li = styled.li`
    list-style-type: none;
    text-decoration: none;
`

const StyledLink = styled(Link)`
    &:hover {
        ${({ theme }) => hoverView(theme.toLowerCase())}
    }
    /* &:visited {
        color: white; 
        background-color: rgb(226,6,6);
    } */

    display: block;
    text-align-last: center;
    border-radius: 0.3rem;
    background-color: white;
    font-weight: bold;
    box-shadow: inset 0 0 10px #cccccc;
    padding: 0.3rem 0.5rem;
    text-decoration: none;
    height: auto;
    ${({ theme }) => standardView(theme.toLowerCase())}
    ${({ conf }) => configuratorView(conf)}
    ${({ marked }) => activeLink(marked.toLowerCase())}

    /*({ active }) => hoverView(active)*/
    /* color: black;
    background-color: white;
    border-color: white;
    border-radius: 0.4rem; */
`
// const NavLink = styled(Link)`
//     &:hover {
//         color: black; 
//         background-color: #cccccc; 
//         margin-right: 1rem;
//     }
//     display: block;
//     text-align-last: center;
//     border-radius: 0.3rem;
//     background-color: white;
//     font-weight: bold;
//     box-shadow: inset 0 0 10px #cccccc;
//     padding: 0.3rem 0.5rem;
//     text-decoration: none;
//     height: auto;
//     color: black; 
//     background-color: white; 
//     margin-right: 1rem;  
// `

export {
    Li,
    StyledLink,
    
}