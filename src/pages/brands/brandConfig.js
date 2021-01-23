import React, { Fragment } from 'react'
import { useParams, useRouteMatch, useHistory } from 'react-router-dom'
import { Route, Switch } from 'react-router-dom'
import Aside from '../../mainComponents/aside/aside'
import { Content } from '../../stylesComponents/content'
import ServerModel from '../../mainComponents/serverModel/serverModel'
import db from '../../storage/database' 
import useAuth from '../../models/auth'

function Brands() {
    const { brand } = useParams()
    const { path } = useRouteMatch();
    const history = useHistory()
    const { isLoggedIn } = useAuth()

    if (!isLoggedIn) {
        return (
            <div>
                <h1>You have to Login first</h1>
                <button type='button' onClick={() => history.push('/login')} >Login</button>
            </div>
        )
    }

    return (
        <Fragment>
            <Aside list={db.getModels(brand)} theme={brand} />
            <Content>
                <Switch>
                    <Route exact path={path} render={() => <ServerModel brand={brand} />}  />
                    <Route path={`${path}/:model`} render={() => <ServerModel brand={brand} />}  />
                </Switch>
            </Content>
        </Fragment>
    )
}

export default Brands