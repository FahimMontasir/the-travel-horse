import React, { useContext } from 'react';
import { Nav, Navbar, Button, Container } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { loginContext } from '../../App';
import logo from '../../images/logo.png'
import './Heading.css'
const Heading = () => {
  const [userData] = useContext(loginContext);
  const history = useHistory();
  const handleRoute = () => {
    history.push("/login")
  }
  return (
    <Navbar expand="md" className="bg-light" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/"> <img className="logo" src={logo} alt="logo" /> </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="mr-auto">
          </Nav>
          <Nav>
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/destination">Destination</Nav.Link>
            <Nav.Link as={Link} to="/blog">Blog</Nav.Link>
            <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
            {
              userData.isSuccess ? <h4>{userData.name}</h4> : <Button onClick={handleRoute} variant="outline-success">Login</Button>
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Heading;