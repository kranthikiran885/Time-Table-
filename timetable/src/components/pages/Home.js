import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaClock, FaBell, FaCalendarAlt, FaChalkboardTeacher, FaDoorOpen, FaBullhorn, FaUniversity, FaUsers, FaCloudDownloadAlt, FaShieldAlt, FaChartLine } from 'react-icons/fa';
import campusImage from '../../assets/vignan-logo.png';
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
        <img src={campusImage} alt="Vignan Logo" className="loading-logo" />
        <div className="loading-spinner"></div>
        <p>Loading Timetable Management System...</p>
      </div>
    );
  }

  return (
    <div className="home-container">
      <section className="welcome-section">
        <div className="welcome-content">
          <p className="welcome-tagline">Synchronise academics across every department in real time.</p>
          <h1>Welcome to Vignan University</h1>
          <p className="welcome-description">Timetable Management System</p>
          <div className="current-time">
            <FaClock /> {getCurrentTimeString()}
          </div>
          <div className="cta-buttons">
            <Link to="/timetable" className="cta-link primary-cta">Explore Timetables</Link>
            <Link to="/rooms" className="cta-link secondary-cta">Monitor Rooms</Link>
          </div>
          <div className="highlight-row">
            <div className="highlight-item">
              <div className="highlight-icon">
                <FaBell />
              </div>
              <div>
                <h3 className="highlight-heading">Instant Alerts</h3>
                <p className="highlight-description">Receive schedule changes and faculty updates without delay.</p>
              </div>
            </div>
            <div className="highlight-item">
              <div className="highlight-icon">
                <FaSearch />
              </div>
              <div>
                <h3 className="highlight-heading">Smart Lookup</h3>
                <p className="highlight-description">Locate classrooms, slots, and departments in just a couple of clicks.</p>
              </div>
            </div>
          </div>
        </div>
        <figure className="campus-visual">
          <img src={campusImage} alt="Vignan University crest" className="campus-image" />
          <figcaption className="campus-caption">
            Crafted for Vignan&apos;s academic community to streamline every timetable.
          </figcaption>
        </figure>
      </section>

      <section className="quick-access">
        <h2>Quick Access</h2>
        <div className="quick-links">
          <Link to="/timetable" className="quick-link">
            <FaCalendarAlt className="quick-link-icon" />
            <span className="quick-link-title">View Timetable</span>
            <p className="quick-link-description">Browse daily schedules across all sections and laboratories.</p>
          </Link>
          <Link to="/faculty" className="quick-link">
            <FaChalkboardTeacher className="quick-link-icon" />
            <span className="quick-link-title">Faculty Status</span>
            <p className="quick-link-description">Check teaching assignments and identify free faculty slots.</p>
          </Link>
          <Link to="/rooms" className="quick-link">
            <FaDoorOpen className="quick-link-icon" />
            <span className="quick-link-title">Room Availability</span>
            <p className="quick-link-description">Track occupancy and secure the right classroom for your session.</p>
          </Link>
          <Link to="/class" className="quick-link">
            <FaBullhorn className="quick-link-icon" />
            <span className="quick-link-title">Class Overview</span>
            <p className="quick-link-description">Review section-wise plans and download consolidated views.</p>
          </Link>
        </div>
      </section>

      <section className="metric-strip">
        <div className="metric-item">
          <FaUniversity className="metric-icon" />
          <div className="metric-content">
            <p className="metric-value">52</p>
            <p className="metric-label">Departments</p>
          </div>
        </div>
        <div className="metric-item">
          <FaDoorOpen className="metric-icon" />
          <div className="metric-content">
            <p className="metric-value">120</p>
            <p className="metric-label">Classrooms</p>
          </div>
        </div>
        <div className="metric-item">
          <FaUsers className="metric-icon" />
          <div className="metric-content">
            <p className="metric-value">600+</p>
            <p className="metric-label">Faculty</p>
          </div>
        </div>
        <div className="metric-item">
          <FaChartLine className="metric-icon" />
          <div className="metric-content">
            <p className="metric-value">Realtime</p>
            <p className="metric-label">Updates</p>
          </div>
        </div>
      </section>

      <section className="application-showcase">
        <h2>Applications</h2>
        <div className="application-grid">
          <div className="application-card">
            <div className="application-icon"><FaSearch /></div>
            <h3 className="application-title">Section Lookup</h3>
            <p className="application-description">Search any section to view a consolidated daily or weekly plan at a glance.</p>
          </div>
          <div className="application-card">
            <div className="application-icon"><FaDoorOpen /></div>
            <h3 className="application-title">Room Booking</h3>
            <p className="application-description">Quickly find available rooms, avoid clashes, and book with a single click.</p>
          </div>
          <div className="application-card">
            <div className="application-icon"><FaChalkboardTeacher /></div>
            <h3 className="application-title">Faculty Tracking</h3>
            <p className="application-description">Check teaching loads and free slots to plan substitutions efficiently.</p>
          </div>
          <div className="application-card">
            <div className="application-icon"><FaCloudDownloadAlt /></div>
            <h3 className="application-title">Export & Share</h3>
            <p className="application-description">Export timetables to PDF and share across departments instantly.</p>
          </div>
        </div>
      </section>

      <section className="trust-badges">
        <div className="badge">
          <FaShieldAlt className="badge-icon" />
          <div>
            <p className="badge-title">Reliable by design</p>
            <p className="badge-text">Built with integrity checks and conflict validation.</p>
          </div>
        </div>
        <div className="badge">
          <FaCloudDownloadAlt className="badge-icon" />
          <div>
            <p className="badge-title">Easy distribution</p>
            <p className="badge-text">One-click exports for committees and class groups.</p>
          </div>
        </div>
      </section>

      <section className="resource-overview">
        <div className="resource-card">
          <h3>Academic Snapshot</h3>
          <p>Live statistics to keep the scheduling committee and faculty aligned.</p>
          <ul className="resource-details">
            <li>52 departments synchronised with central scheduling.</li>
            <li>120 classrooms tracked with up-to-the-minute occupancy.</li>
            <li>Automated conflict checks across labs and lecture halls.</li>
          </ul>
        </div>
        <div className="resource-card">
          <h3>Need Assistance?</h3>
          <p>Reach the timetable coordination desk for clarifications or urgent changes.</p>
          <div className="contact-grid">
            <span className="contact-label">Support Desk</span>
            <a href="mailto:timetable@vignan.ac.in" className="contact-link">timetable@vignan.ac.in</a>
            <span className="contact-label">Helpline</span>
            <a href="tel:+919876543210" className="contact-link">+91 98765 43210</a>
          </div>
        </div>
      </section>

      <section className="current-status">
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
            <div className="status-item">
              <p>Seminar Hall 2: Placement Training</p>
              <small>Career Guidance Cell</small>
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
            <div className="status-item available">
              <p>Innovation Studio</p>
              <small>Available after 12:30 PM</small>
            </div>
          </div>
        </div>
      </section>

      <section className="announcements">
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
          <div className="announcement">
            <h4>Semester Timetable Review</h4>
            <p>Department heads to submit updates for the July semester by March 28th, 2025.</p>
            <small>Posted 3 days ago</small>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
