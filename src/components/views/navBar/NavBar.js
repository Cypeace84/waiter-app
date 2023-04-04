import { Container, Navbar, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
  return (
    <Container>
      <Navbar
        collapseOnSelect
        expand='md'
        bg='primary'
        variant='dark'
        className={'my-4 rounded'}
      >
        <Navbar.Brand as={NavLink} to='/' className='ps-3'>
          waiter.app
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse
          className='justify-content-end'
          id='responsive-navbar-nav'
        >
          <Nav className='ml-auto px-3'>
            <Nav.Link as={NavLink} to='/'>
              Home
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Container>
  );
};

export default NavBar;
