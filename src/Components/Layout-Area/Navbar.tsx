import { Container, Nav, Navbar } from "react-bootstrap"
import { NavLink } from "react-router-dom";

const MyNavbar = () => {
      return (
            <Navbar expand='md' variant="dark" bg='dark' collapseOnSelect>
                  <Container fluid>
                        <Navbar.Brand as={NavLink} to="/">Family-tasks</Navbar.Brand>
                        <Navbar.Toggle />

                        <Navbar.Collapse id="basic-navbar-nav">
                              <Nav className="me-auto">
                                    <Nav.Link eventKey={0.1} as={NavLink} to="/tasks-list">Task-List</Nav.Link>
                                    <Nav.Link eventKey={0.2} as={NavLink} to="/add-task">Add Task</Nav.Link>
                                    <Nav.Link eventKey={0.3} as={NavLink} to="/house-members">House-Members</Nav.Link>
                                    <Nav.Link eventKey={0.4} as={NavLink} to="/add-house-member">Add House-Member</Nav.Link>
                              </Nav>
                        </Navbar.Collapse>
                  </Container>
            </Navbar>
      )
}

export default MyNavbar;