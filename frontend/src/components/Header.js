import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { logout } from '../actions/userActions'
import { Link } from 'react-router-dom'

const Header = (history) => {
    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    const logoutHandler = () => {
        dispatch(logout())
    }

    return (
        <header>
            <div id="overlay"></div>
            <Navbar bg='light' expand="lg" collapseOnSelect>
                <Container>
                    <LinkContainer to='/'>
                        <Navbar.Brand>Travel.ID</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            <LinkContainer to='/foods'>
                                <Nav.Link> Food</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to='/gallery'>
                                <Nav.Link> Galerry</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to='/hotels'>
                                <Nav.Link> Hotels</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to='/activities'>
                                <Nav.Link> Activities</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to='/vacationpackages'>
                                <Nav.Link> Vacation Packages</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to='/cart'>
                                <Nav.Link><i className="fas fa-shopping-cart"></i></Nav.Link>
                            </LinkContainer>
                            {userInfo ? (
                                <NavDropdown title={userInfo.name} id='username'>
                                    <LinkContainer to='/profile'>
                                        <NavDropdown.Item>Profile</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to ='/'>
                                    <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                                    </LinkContainer>
                                </NavDropdown>
                            ) : <LinkContainer to='/login'>
                                <Nav.Link><i className="fas fa-user"></i> Sign in</Nav.Link>
                            </LinkContainer>}

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header