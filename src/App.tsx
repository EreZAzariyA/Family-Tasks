import React, { } from 'react';
import { Container, Row } from 'react-bootstrap';
import { Routes, Route } from 'react-router-dom';
import Header from './Components/Layout-Area/Header';
import HomePage from './Components/Layout-Area/Home-Page';
import MyNavbar from './Components/Layout-Area/Navbar';
import AddHouseMember from './Components/Pages/AddHouseMember';
import AddTask from './Components/Pages/AddTask';
import EditTask from './Components/Pages/EditTask';
import TasksList from './Components/Pages/TasksList';


function App() {

  return (
    <Container fluid>
      <Row as='header'>
        <Header />
      </Row>

      <Row className="mt-2">
        <MyNavbar />
      </Row>

      <Row as='main' className='mt-2'>
        <Container fluid>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/tasks-list' element={<TasksList />} />
            <Route path='/add-task' element={<AddTask />} />
            <Route path='/edit-task/:taskId' element={<EditTask />} />
            <Route path='/add-house-member' element={<AddHouseMember />} />
          </Routes>
        </Container>
      </Row>

      <Row as='footer'>
        <p>footer</p>
      </Row>
    </Container>
  );
}

export default App;
