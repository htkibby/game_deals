import { useNavigate } from "react-router-dom"
import { Nav } from "react-bootstrap"
import { Navbar } from "react-bootstrap"
import Container from "react-bootstrap/Container"
import { logout } from "../helpers/logout";

export const NavBar = () => {
   const navigate = useNavigate()
   const onLogout = () => {
      logout.logout(navigate);
    };

   return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" sticky="top">
        <Container>
          <Navbar.Brand href="/">Game Deals</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/savedgames">Saved Games</Nav.Link>
              <Nav.Link href="/bestdeals">Best Deals</Nav.Link>
              <Nav.Link href="/cheapestdeals">Cheapest Deals</Nav.Link>
            </Nav>
            <Nav>
               <Nav.Link onClick={onLogout}>Logout</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
}