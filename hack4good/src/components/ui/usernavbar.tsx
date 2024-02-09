// Navbar.tsx
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebaseSetup";

function UserNavBar() {
    const navigate = useNavigate();

    async function handleLogout() {
        
        await auth.signOut();

        navigate('/');
      }

  return (
    <Navbar data-bs-theme="light" expand="lg" className="navbar fixed-top">
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
          <Nav.Link href="/wlc">Home</Nav.Link>
            <Nav.Link href="/opportunities">Opportunities</Nav.Link>
            <Nav.Link href="/registered">Registered Events</Nav.Link>
            <NavDropdown title="Settings" id="basic-nav-dropdown">
              <NavDropdown.Item href="preferences">Volunteer Preferences</NavDropdown.Item>
              <NavDropdown.Item href="information">
                User Profile
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleLogout}>
                Log Out
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
        </Container>
      </Navbar>
  );
}

export default UserNavBar;
