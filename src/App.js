
import { Route, Switch, Redirect } from 'react-router-dom'
import styled from 'styled-components'
import StockPage from './pages/home/stockPage'
import Header from './mainComponents/header/header'
import Configurator from './pages/configurator/configurator'
import Brands from './pages/brands/brandConfig'
import EditPage from './pages/edit/editPage'
import RegisterPage from './pages/user/registerPage'
import LoginPage from './pages/user/loginPage'
import Logout from './pages/user/logoutPage'
import { useEffect, useState } from 'react'
import auth from './models/auth'


function App() {
  // const { userData, userAuth } = useAuth()
  const [ user, setUser ] = useState('')
  const [refresh, setRefresh] = useState(false)

  useEffect(() => {
    const { userData } = auth()
    setUser(userData)
  }, [refresh])

  const refreshApp = () => {
    setRefresh(state => !state)
  }


  return (
    <Main className="Main">
      <Header userData={user}/>
      <Container>
        <Switch>
          <Route exact path="/" render={() => <Redirect to='/Stock/ALL' />} />
          <Route path="/stock" component={StockPage} />
          <Route path="/edit/:id" component={EditPage} />
          <Route path="/edit" component={EditPage} />
          <Route path="/configurator/:brand" component={Brands} />
          <Route path="/configurator/" component={Configurator} />
          <Route path="/register" component={RegisterPage} />
          <Route path="/login" render={() => <LoginPage login={refreshApp} />} />
          <Route path="/logout" render={() => <Logout logout={refreshApp} />} />
          <Route render={() => (<div>ERROR PAGE</div>)} />
        </Switch>
      </Container>
    </Main>
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