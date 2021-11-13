import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, Container } from 'react-bootstrap'

const Header = () => {
    return (
        <header>
            <Navbar bg='light' expand="lg" collapseOnSelect>
                <Container>
                    <LinkContainer to='/'>
                        <Navbar.Brand>Travel.ID</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            <LinkContainer to='/food'>
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
                                <Nav.Link><i className="fas fa-shopping-cart"></i> Cart</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to='/login'>
                                <Nav.Link><i className="fas fa-user"></i> Sign in</Nav.Link>
                            </LinkContainer>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header