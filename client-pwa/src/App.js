import React from 'react'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import InstallPage from './pages/InstallPage'
import ShopPage from './pages/ShopPage'

function App() {
  return (
    <Router>
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
