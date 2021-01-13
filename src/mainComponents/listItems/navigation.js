import React, { Fragment, useEffect, useState } from 'react'
import { Li, StyledLink } from '../../stylesComponents/li'
import { useLocation, useRouteMatch } from 'react-router-dom'




function ListItems(props) {
    const [value, setValue] = useState('')
    const { pathname } = useLocation()
    const { url } = useRouteMatch()
    // let model = pathname.match(/[a-zA-Z\d]+$/) || ""
    const { nav, conf, theme } = props
    const path = link(url)

    function link(url) {
        let link = ''
        switch (true) {
            case /\/$/.test(url): 
                link = ''; break;
            case /\/Edit/.test(url):
                link = '/Stock'; break;
            default:
                link = url; break;
        }
        return link
    }

    useEffect(() => {
        if (pathname === url) {
            setValue('')
        }
    }, [pathname, url])


    const links = nav.map((x, i) => {
        return (
            <Li key={i}>
                <StyledLink to={`${path}/${x}`}
                    conf={conf}
                    theme={theme || x}
                    marked={value === i ? (theme || x) : ''}
                    onClick={(e) => {
                        setValue(i)
                        // e.target.setAttribute('marked', true)
                    }}>
                    {x}
                </StyledLink>
            </Li>
        )
    })

    return (
        <Fragment>
            {links}
        </Fragment>
    )
}

export default ListItems
