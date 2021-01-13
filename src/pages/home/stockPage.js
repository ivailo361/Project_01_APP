import React, { Fragment, useEffect, useState } from 'react'
import { Route, Switch, useRouteMatch, } from 'react-router-dom'
import Aside from '../../mainComponents/aside/aside'
import { Content } from '../../stylesComponents/content'
import ManufacturerPage from '../../pages/manufacturerStock/manufacturerStock'
import { getData } from '../../models/fetcher'
import db from '../../storage/database'
import { ErrorMsg } from '../../mainComponents/messenger/message'
import useNotifications from '../../models/notification'


function StockPage() {
    const [list, setList] = useState([])
    const { error, errorMessage, closeMessage} = useNotifications()

    let { path } = useRouteMatch();

    useEffect(() => {
        if (db.getManufacturerList().length <= 1 ) {
            getData('/api/stock')
            .then((res) => {
                console.log(res)
                db.setManufacturerList(res[0])
                db.setTypesComponents(res[1])
                setList(db.getManufacturerList())
            }).catch(e => errorMessage(e.message))
        } else {
            setList(db.getManufacturerList())
        }
    }, [])

    return (
        <Fragment>
            {error ? <ErrorMsg message={error} closeMessage={closeMessage}/> : null}
            <Aside list={list} />
            <Content>
                <Switch>
                    <Route exact path={path} component={ManufacturerPage}/>
                    <Route path={`${path}/:manufacturer`} component={ManufacturerPage} />
                </Switch>
            </Content>
        </Fragment>
    )
}

export default StockPage
