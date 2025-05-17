import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { FaHome, FaCalendarAlt, FaUserTie, FaDoorOpen, FaGraduationCap, FaSun, FaMoon } from 'react-icons/fa';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Toaster } from 'react-hot-toast';
import Home from './components/pages/Home';
import TimeTable from './components/TimeTable';
import Faculty from './components/pages/Faculty';
import Rooms from './components/pages/Rooms';
import ClassView from './components/pages/ClassView';
import Footer from './components/Footer';
import vignanLogo from './assets/vignan-logo.png';
import './App.css';

// Wrapper component to handle transitions
const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <TransitionGroup component={null}>
      <CSSTransition
        key={location.key}
        timeout={300}
        classNames="page"
        unmountOnExit
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/timetable" element={<TimeTable />} />
          <Route path="/class" element={<ClassView />} />
          <Route path="/faculty" element={<Faculty />} />
          <Route path="/rooms" element={<Rooms />} />
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  );
};

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-mode');
  };

  return (
    <Router>
      <div className={`app ${darkMode ? 'dark-mode' : ''}`}>
        <nav className="navbar">
          <div className="nav-brand">
            <img src={vignanLogo} alt="Vignan Logo" className="nav-logo" />
            <h1>Vignan University</h1>
          </div>
          
          <div className="nav-links">
            <Link to="/" className="nav-link">
              <FaHome /> Home
            </Link>
            <Link to="/timetable" className="nav-link">
              <FaCalendarAlt /> Timetable
            </Link>
            <Link to="/class" className="nav-link">
              <FaGraduationCap /> Class View
            </Link>
            <Link to="/faculty" className="nav-link">
              <FaUserTie /> Faculty
            </Link>
            <Link to="/rooms" className="nav-link">
              <FaDoorOpen /> Rooms
            </Link>
            <button 
              className="dark-mode-toggle" 
              onClick={toggleDarkMode}
              aria-label="Toggle dark mode"
            >
              {darkMode ? <FaSun /> : <FaMoon />}
            </button>
          </div>
        </nav>

        <main className="main-content">
          <AnimatedRoutes />
        </main>

        <Footer />

        <Toaster 
          position="bottom-right"
          toastOptions={{
            className: darkMode ? 'dark-toast' : '',
            style: {
              background: darkMode ? '#333' : '#fff',
              color: darkMode ? '#fff' : '#333',
            },
          }} 
        />
      </div>
    </Router>
  );
};

export default App;
