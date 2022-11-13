import React from 'react';
import { Container, Row } from 'react-bootstrap';
import { Routes, Route } from 'react-router-dom';
import Header from './Components/Layout-Area/Header';
import HomePage from './Components/Pages/Home-Page';
import MyNavbar from './Components/Layout-Area/Navbar';
import AddHouseMember from './Components/Members-Area/AddMember';
import AddTask from './Components/Tasks-Area/AddTask';
import EditTask from './Components/Tasks-Area/UpdateTask';
import TasksList from './Components/Tasks-Area/TasksList';
import HouseMembersList from './Components/Members-Area/MembersList';
import UpdateMember from './Components/Members-Area/UpdateMember';
import Footer from './Components/Layout-Area/Footer';

const style: React.CSSProperties = {
  height: '100%',
  display: 'grid',
  boxSizing: 'border-box',
  gridTemplateRows: 'min-content min-content auto min-content'
}

function App() {

  return (
    <Container fluid style={style}>
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

            {/* Tasks routes */}
            <Route path='/tasks-list' element={<TasksList />} />
            <Route path='/add-task' element={<AddTask />} />
            <Route path='/update-task/:taskId' element={<EditTask />} />

            {/* House-members routes */}
            <Route path='/house-members' element={<HouseMembersList />} />
            <Route path='/add-house-member' element={<AddHouseMember />} />
            <Route path='/update-member/:memberId' element={<UpdateMember />} />
          </Routes>
        </Container>
      </Row>

      <Row as='footer' style={{ color: 'white' }}>
        <Footer />
      </Row>
    </Container>
  );
}

export default App;
