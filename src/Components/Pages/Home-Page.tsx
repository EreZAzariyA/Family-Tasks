import { Col, Container, Nav, Row } from "react-bootstrap"
import { BsGithub, BsLinkedin, BsFacebook } from "react-icons/bs";

const box = {
      padding: '50px',
      margin: 'auto',
      width: 'fit-content',
      height: 'fit-content',
      backgroundColor: 'lightgray',
      borderRadius: '10px',
      fontSize: 'large',
      fontStyle: 'italic',
      fontWeight: 'bold',
      boxShadow: '10px 30px 10px 0'
}

const HomePage = () => {
      return (
            <Container fluid>

                  <Container style={box}>
                        <p>
                              Welcome to "Family-Tasks".<br />
                              In this web you can control your family tasks.<br />
                              You can to:
                        </p>
                        <ul>
                              <li>Add New House Member</li>
                              <li>Add new task</li>
                              <li>Delete task</li>
                        </ul>
                        <br />
                        <p>Enjoy!</p>
                  </Container>


                  <Row style={{ color: 'white' }} className='mt-4'>
                        <Col sm='3'>
                              <strong style={{ textDecoration: 'underline' }}>
                                    Technologies
                              </strong>
                              <ul className="mt-2">
                                    <li>TypeScript</li>
                                    <li>React.JS</li>
                                    <li>Bootstrap</li>
                                    <li>Mobx</li>
                                    <li>UUID</li>
                                    <li>React-Icons</li>
                              </ul>
                        </Col>
                        <Col sm='6'>
                              <strong style={{ textDecoration: 'underline' }}>
                                    Connect-Us
                              </strong>

                              <Nav.Link href="https://github.com/EreZAzariyA" className="mt-2 p-2">
                                    GitHub <BsGithub size='25px' />
                              </Nav.Link>

                              <Nav.Link href="https://www.linkedin.com/in/erez-azariya/" className="mt-2 p-2">
                                    Linkedin <BsLinkedin size='25px' />
                              </Nav.Link>

                              <Nav.Link href="https://www.facebook.com/profile.php?id=100005731632474" className="mt-2 p-2">
                                    Facebook <BsFacebook size='25px' />
                              </Nav.Link>


                        </Col>
                        <Col sm='3'>
                              <strong style={{ textDecoration: 'underline' }}>
                                    More-Info
                              </strong>
                              <p>
                                    This project build for studies properties only!
                              </p>
                              <p>
                                    System data manage on local-storage
                              </p>
                        </Col>
                  </Row>
            </Container >
      )
}

export default HomePage;