// Navbar.tsx
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebaseSetup";

function AdminNavBar() {
    const navigate = useNavigate();

    async function handleLogout() {
        
        await auth.signOut();

        navigate('/');
      }

  return (
    <Navbar bg="dark" data-bs-theme="dark" expand="lg" className="bg-body-tertiary fixed-top">
        <Container>
        <Navbar.Brand href="/wlc">
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
            <Nav.Link href="/adminhome">Admin Home</Nav.Link>
            <Nav.Link onClick={handleLogout}> Log Out </Nav.Link>
          </Nav>
        </Navbar.Collapse>
        </Container>
      </Navbar>
  );
}

export default AdminNavBar;
