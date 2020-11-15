import React, { useEffect } from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getDetailsShop } from '../store/actions/shopActions'

function NavbarHome() {
  const dispatch = useDispatch()
  const shopId = window.location.href.split('/')[3]

  const { shop, loading, errors } = useSelector(
    (state) => state.shopDetailsReducer
  )

  useEffect(() => {
    if (shopId) {
      dispatch(getDetailsShop(shopId))
    }
  }, [])

  console.log(shopId)
  return (
    <Navbar bg='light' expand='lg'>
      {shop && shop.name ? (
        <Navbar.Brand as={Link} to={`/${shopId}/shop`}>
          {shop.name}
        </Navbar.Brand>
      ) : (
        <Navbar.Brand as={Link} to={`/${shopId}`}>
          ShopMaker
        </Navbar.Brand>
      )}

      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <Navbar.Collapse id='basic-navbar-nav'>
        <Nav className='mr-auto'>
          <Nav.Link as={Link} to={`/${shopId}/shop`}>
            Home
          </Nav.Link>
          <Nav.Link href='/product'>Product</Nav.Link>
          <Nav.Link href='#link'>Customer</Nav.Link>
          <Nav.Link href='/login'>Logout</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default NavbarHome
