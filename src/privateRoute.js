import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import StockPage from './pages/home/stockPage'
import Configurator from './pages/configurator/configurator'
import Brands from './pages/brands/brandConfig'
import EditPage from './pages/edit/editPage'

function PrivateRoute(/*{ children, ...rest }*/) {

    const userData = JSON.parse(sessionStorage.getItem('user'))

    return (
        userData
            ? <Switch>
                <Route path="/stock" component={StockPage} />
                <Route path="/configurator/:brand" component={Brands} />
                <Route path="/configurator" component={Configurator} />
                {userData.type === 'admin'
                    ? <Switch>
                        <Route path="/edit" component={EditPage} />
                    </Switch>
                    : <Redirect to="/stock" />
                }
            </Switch>
            : <Redirect to="/login" />
    )

    // return (
    //     <Route
    //         {...rest}
    //         render={({ location }) => {
    //             console.log(children)
    //             return userData ? (
    //                 children
    //             ) : (
    //                     <Redirect
    //                         to={{
    //                             pathname: "/Login",
    //                             state: { from: location }
    //                         }}
    //                     />
    //                 )
    //         }}
    //     />
    // );
}

export default PrivateRoute