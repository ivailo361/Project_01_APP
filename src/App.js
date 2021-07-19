
import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import styled from 'styled-components'
import Header from './mainComponents/header/header'
import RegisterPage from './pages/user/registerPage'
import LoginPage from './pages/user/loginPage'
import Logout from './pages/user/logoutPage'
import PrivateRoute from './privateRoute'

import { ProvideAuth } from './models/context'


function App() {


  return (
    <ProvideAuth>
      <Main className="Main">
        <Header />
        <Container>
          <Switch>
            <Route exact path="/" render={() => <Redirect to='/stock' />} />
            <Route path="/register" component={RegisterPage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/logout" component={Logout} />
            <PrivateRoute />
            <Route render={() => (<div>ERROR PAGE!!!</div>)} />
          </Switch>
        </Container>
      </Main>
    </ProvideAuth>
  );
}

export default App;

const Main = styled.div`
  position: relative;
  min-height: 100vh;
  height: auto;
  display: flex;
  flex-direction: column;
`
const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: space-evenly;
  margin-top: 0.5rem;
  flex-grow: 2
`