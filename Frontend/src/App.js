import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import Routes instead of Switch
import 'bootstrap/dist/css/bootstrap.min.css';
import Course from './pages/course';
import Register from './pages/register';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/course" element={<Course />} />
        <Route path="" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
