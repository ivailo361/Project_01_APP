import React, { Fragment, useEffect, useState } from 'react'
import { Route, Switch, useRouteMatch, useHistory} from 'react-router-dom'
import Aside from '../../mainComponents/aside/aside'
import { Content } from '../../stylesComponents/content'
import ManufacturerPage from '../../pages/manufacturerStock/manufacturerStock'
import { getData } from '../../models/fetcher'
import db from '../../storage/database'
import useNotifications from '../../models/notification'
import { ErrorMsg } from '../../mainComponents/messenger/message'
import useAuth from '../../models/auth'


function StockPage() {
    const [list, setList] = useState([])
    const { error, errorMessage, closeMessage} = useNotifications()
    const { isLoggedIn } = useAuth()

    let { path } = useRouteMatch()
    let history = useHistory()

    useEffect(() => {
        // console.log('inside useEffect')
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

    if (!isLoggedIn) {
        return (
            <div>
                <h1>You have to Login</h1>
                <button type='button' onClick={() => history.push('/login')} >Login</button>
            </div>
        )
    }

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
