import React from 'react'
import { Navbar, Nav, Button } from 'react-bootstrap'
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
      <Navbar bg='light' expand='lg' className='d-flex justify-content-between'>
        <Navbar.Brand as={Link} to={shopInfo && shopInfo.name ? '/home' : '/'}>
          ShopMaker
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' className="p-0" />
        <Navbar.Collapse id='basic-navbar-nav' className='justify-content-end'>
          <Nav className='container-fluid p-0'>
            {shopInfo && !shopInfo.name && (
              <>
                <Nav.Item className='ml-auto'>
                  <Nav.Link as={Link} to='/login'>
                    Login
                  </Nav.Link>
                </Nav.Item>
              </>
            )}
            {shopInfo && shopInfo.name && (
              <>
                <Nav.Item className='ml-auto'>
                  <Nav.Link onClick={logoutHandler} className="text-danger">
                      Logout
                    
                  </Nav.Link>
                </Nav.Item>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  )
}

export default NavbarHome
