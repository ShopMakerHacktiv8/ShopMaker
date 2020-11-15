import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../store/actions/shopActions'

function NavbarHome() {
  const dispatch = useDispatch()

  const { shopInfo } = useSelector((state) => state.shopLoginReducer)
  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
    <>
      <Navbar bg='light' expand='lg'>
        <Navbar.Brand as={Link} to={shopInfo && shopInfo.name ? '/home' : '/'}>
          ShopMaker
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='mr-auto'>
            {shopInfo && !shopInfo.name && (
              <>
                <Nav.Link as={Link} to='/login'>
                  Login
                </Nav.Link>{' '}
              </>
            )}
            {shopInfo && shopInfo.name && (
              <>
                <Nav.Link as={Link} to='/home'>
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to='/product'>
                  Product
                </Nav.Link>

                <Nav.Link as={Link} to='/payment'>
                  Payment
                </Nav.Link>
                <Nav.Link onClick={logoutHandler}>Logout</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  )
}

export default NavbarHome
