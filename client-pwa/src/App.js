import React from 'react'
import { Navbar } from 'react-bootstrap'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import NavbarHome from './components/NavbarHome'
import InstallPage from './pages/InstallPage'
import ShopPage from './pages/ShopPage'

function App() {
  return (
    <Router>
      <NavbarHome />
      <Switch>
        <Route path='/:shopId/shop'>
          <ShopPage />
        </Route>
        <Route path='/:shopId'>
          <InstallPage />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
