import { Container } from "react-bootstrap"

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
      )
}

export default HomePage;