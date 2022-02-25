import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './components/pages/Home/Home';
import Contact from './components/pages/Contact/Contact';
import Company from './components/pages/Company/Company';
import NewProject from './components/pages/NewProject/NewProject';
import Projects from './components/pages/Projects/Projects';

import Container from './components/layouts/Container/Container';
import Navbar from './components/layouts/Navbar/Navbar';
import Footer from './components/layouts/Footer/Footer';
import Project from './components/pages/Project/Project';

function App() {
  return (
    <Router> 
      <Navbar/>
      <Container customClass='min-height'>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/company' element={<Company/>} />
          <Route path='/contact' element={<Contact/>} />
          <Route path='/projects' element={<Projects/>} />
          <Route path='/newproject' element={<NewProject/>} />
          <Route path='/project/:id' element={<Project/>} />
        </Routes>
      </Container>
      <Footer/>
    </Router>
  );
}

export default App;
