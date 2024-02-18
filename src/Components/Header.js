// Header.jsx
import React from 'react';
import { Button, Col, Nav, NavDropdown, Navbar, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { isUserLoggedIn, logout } from '../Services/AuthService';

const Header = ({ categories }) => {
  const navigate = useNavigate();

  function handleLogout() {
    logout()
    navigate('/');
  }

  function handleAbout(){
    navigate('/about');
  }

  return (
    <div>
      <header>
        <Navbar variant="dark" bg="dark" expand="lg">
          <Navbar.Brand href='/' style={{fontFamily: 'Courier New', fontWeight: 'bold'}}>Tricks&Codes</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-dark-example" />
          <Navbar.Collapse id="navbar-dark-example">
            <Nav className='mr-auto'>
              {categories.map((category) => (
                <NavDropdown title={category.name} id={category.id} key={category.id}>
                  {category.artname.length > 0 ? (
                    category.artname.map((art, index) => (
                      <NavDropdown.Item key={category.artid[index]} href={`/article/${category.artid[index]}`}>
                        {art}
                      </NavDropdown.Item>
                    ))
                  ) : (
                    <NavDropdown.Item>No articles available</NavDropdown.Item>
                  )}
                </NavDropdown>
              ))}
            </Nav>
            <Nav>
              <Button variant='outline-dark' style={{ color: 'white', marginLeft:'20px' }} onClick={handleAbout}>
                About
              </Button>
            </Nav>
            <Nav>
            {isUserLoggedIn() && (
                  <Row className="align-items-center">
                    <Col></Col>
                    <Col xs="auto">
                      <Button variant='outline-danger' onClick={handleLogout}>Log out</Button>
                    </Col>
                  </Row>
                )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </header>
    </div>
  );
};

export default Header;
