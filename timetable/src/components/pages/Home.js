import React, { useState, useEffect } from 'react';
import { FaSearch, FaClock, FaBell } from 'react-icons/fa';
import './Home.css';

const Home = () => {
  const [showContent, setShowContent] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 2000);

    const clockTimer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => {
      clearTimeout(timer);
      clearInterval(clockTimer);
    };
  }, []);

  const getCurrentTimeString = () => {
    return currentTime.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  if (!showContent) {
    return (
      <div className="loading-screen">
        <img src="/vignan-logo.png" alt="Vignan Logo" className="logo" />
        <div className="loading-spinner"></div>
        <p>Loading Timetable Management System...</p>
      </div>
    );
  }

  return (
    <div className="home-container">
      <div className="welcome-section">
        <h1>Welcome to Vignan University</h1>
        <p>Timetable Management System</p>
        <div className="current-time">
          <FaClock /> {getCurrentTimeString()}
        </div>
      </div>

      <div className="quick-access">
        <h2>Quick Access</h2>
        <div className="quick-links">
          <a href="/timetable" className="quick-link">
            <i className="fas fa-calendar"></i>
            <span>View Timetable</span>
          </a>
          <a href="/faculty" className="quick-link">
            <i className="fas fa-chalkboard-teacher"></i>
            <span>Faculty Status</span>
          </a>
          <a href="/rooms" className="quick-link">
            <i className="fas fa-door-open"></i>
            <span>Room Availability</span>
          </a>
          <a href="/notices" className="quick-link">
            <i className="fas fa-bullhorn"></i>
            <span>Latest Notices</span>
          </a>
        </div>
      </div>

      <div className="current-status">
        <div className="status-card ongoing-classes">
          <h3><FaBell /> Ongoing Classes</h3>
          <div className="status-list">
            <div className="status-item">
              <p>Room A101: Computer Networks</p>
              <small>Dr. Ramesh Kumar (CSE-A)</small>
            </div>
            <div className="status-item">
              <p>Room B205: Database Management</p>
              <small>Prof. Sita Sharma (CSE-B)</small>
            </div>
          </div>
        </div>

        <div className="status-card available-rooms">
          <h3><FaSearch /> Available Rooms</h3>
          <div className="status-list">
            <div className="status-item available">
              <p>Room 102</p>
              <small>Available for next 2 hours</small>
            </div>
            <div className="status-item available">
              <p>Lab-1</p>
              <small>Available all day</small>
            </div>
          </div>
        </div>
      </div>

      <div className="announcements">
        <h2>Important Announcements</h2>
        <div className="announcement-list">
          <div className="announcement">
            <h4>Mid-Semester Exam Schedule</h4>
            <p>The mid-semester examinations will begin from April 15th, 2025.</p>
            <small>Posted 2 hours ago</small>
          </div>
          <div className="announcement">
            <h4>Guest Lecture</h4>
            <p>Special lecture on AI/ML by industry experts on April 5th, 2025.</p>
            <small>Posted yesterday</small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
