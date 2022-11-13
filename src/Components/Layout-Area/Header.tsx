import { Col, Row } from "react-bootstrap"

const title = {
      fontSize: 'xxx-large',
      textDecoration: 'underline',
      fontStyle: 'italic'
}

const Header = () => {
      return (
            <Row className="justify-content-center">
                  <Col>
                        <h1 style={title}>
                              Family Tasks
                        </h1>
                  </Col>
            </Row>
      )
}

export default Header