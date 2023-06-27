import { NavLink } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './PageHeader.css';
import '../../style/hover-underline.css';

const PageHeader = () => {
  return (
    <Navbar expand="lg" bg="dark" variant="dark" className="custom-navbar">
      <Container>
        <Navbar.Brand as={NavLink} to="/" className="navbar-brand">
          API
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" className="navbar-toggler" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={NavLink} to="/" exact className="nav-link hover-underline">Home</Nav.Link>
            <Nav.Link as={NavLink} to="/authors" className="nav-link hover-underline">Authors</Nav.Link>
            <Nav.Link as={NavLink} to="/movies" className="nav-link hover-underline">Movies</Nav.Link>
            <Nav.Link as={NavLink} to="/reviews" className="nav-link hover-underline">Reviews</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default PageHeader;