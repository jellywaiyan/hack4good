// Navbar.tsx
import { Navbar, Container, Nav } from "react-bootstrap";

function GuestNavBar() {

  return (
    <Navbar bg="dark" data-bs-theme="dark" expand="lg" className="bg-body-tertiary fixed-top">
        <Container>
        <Navbar.Brand href="/">
          <img
          src='./src/assets/BAHLogo.jpg'
          width="50"
          height="50"
          className="d-inline-block align-center"
          />
          </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-na">
          <Nav className="me-auto">
            <Nav.Link href="/register">Sign Up!</Nav.Link>
            <Nav.Link 
            href="/login" id="basic-nav-dropdown"> Log In </Nav.Link>
          </Nav>
        </Navbar.Collapse>
        </Container>
      </Navbar>
  );
}

export default GuestNavBar;
