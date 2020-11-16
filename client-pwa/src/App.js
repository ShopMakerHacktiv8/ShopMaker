import React from 'react'
import { Navbar } from 'react-bootstrap'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import NavbarHome from './components/NavbarHome'
import DetailsPage from './pages/DetailsPage'
import InstallPage from './pages/InstallPage'
import OrdersPage from './pages/OrdersPage'
import PaymentPage from './pages/PaymentPage'
import ShopPage from './pages/ShopPage'

function App() {
  return (
    <Router>
      <NavbarHome />
      <Switch>
        <Route path='/:shopId/shop'>
          <ShopPage />
        </Route>
        <Route path='/:shopId/payment'>
          <PaymentPage />
        </Route>
        <Route path='/:shopId/orders'>
          <OrdersPage />
        </Route>
        <Route path='/:shopId/product/:productId'>
          <DetailsPage />
        </Route>
        <Route path='/:shopId'>
          <InstallPage />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
