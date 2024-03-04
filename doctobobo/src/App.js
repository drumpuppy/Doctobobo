import React from 'react';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import BookAppointment from './pages/BookAppointment';
import Connection from './pages/Connection';
import Inscription from './pages/Inscription';
import Meeting from './pages/Meeting';
import MySpace from './pages/MySpace';
import Result from './pages/Result';
import './css/App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/book_appointment" element={<BookAppointment />} />
        <Route path="/connection" element={<Connection />} />
        <Route path="/inscription" element={<Inscription />} />
        <Route path="/meeting" element={<Meeting />} />
        <Route path="/my_space" element={<MySpace />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </Router>
  );
}

export default App;
