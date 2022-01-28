import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { logout } from '../actions/userActions'

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
                    <Navbar.Collapse className="justify-content-center" id="basic-navbar-nav">
                        <Nav>
                            <LinkContainer to='/foods'>
                                <Nav.Link> Food</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to='/galleries'>
                                <Nav.Link> Galerry</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to='/hotels'>
                                <Nav.Link> Hotels</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to='/activities'>
                                <Nav.Link> Activities</Nav.Link>
                            </LinkContainer>
                        </Nav>
                    </Navbar.Collapse>
                    <Nav className="ml-auto">
                        <LinkContainer to='/cart'>
                            <Nav.Link><i className="fas fa-shopping-cart"></i></Nav.Link>
                        </LinkContainer>
                        {userInfo ? (
                            <NavDropdown title={userInfo.name} id='username'>
                                <LinkContainer to='/profile'>
                                    <NavDropdown.Item>Profile</NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer to='/myactivities'>
                                    <NavDropdown.Item>My Activity Orders</NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer to='/myfoodorders'>
                                    <NavDropdown.Item>My Food Orders</NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer to='/myhotelbooking'>
                                    <NavDropdown.Item>My Hotel Bookings</NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer to='/'>
                                    <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                                </LinkContainer>
                            </NavDropdown>
                        ) : <LinkContainer to='/login'>
                            <Nav.Link><i className="fas fa-user"></i> Sign in</Nav.Link>
                        </LinkContainer>}
                        {userInfo && userInfo.isAdmin && (
                            <NavDropdown title='Admin' id='adminmenu'>
                                <LinkContainer to='/admin/userlist'>
                                    <NavDropdown.Item>Users</NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer to='/admin/activitylist'>
                                    <NavDropdown.Item>Activities</NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer to='/admin/foodlist'>
                                    <NavDropdown.Item>Foods</NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer to='/admin/hotellist'>
                                    <NavDropdown.Item>Hotels</NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer to='/admin/gallerylist'>
                                    <NavDropdown.Item>Galleries</NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer to='/admin/foodorderlist'>
                                    <NavDropdown.Item>Food Orders</NavDropdown.Item>
                                </LinkContainer>
                            </NavDropdown>
                        )}
                    </Nav>

                </Container>
            </Navbar>
        </header>
    )
}

export default Header