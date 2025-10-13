import React, { useMemo, useState } from 'react';
import { FaUserTie, FaMapMarkerAlt, FaClock, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import './Faculty.css';

const FACULTY_DIRECTORY = [
  {
    id: 1,
    name: 'Dr. Ramesh Kumar',
    department: 'CSE',
    status: 'teaching',
    currentLocation: 'A101',
    currentClass: 'Computer Networks',
    section: 'CSE-A',
    nextClass: {
      subject: 'Data Structures',
      time: '11:00 AM',
      room: 'B205'
    }
  },
  {
    id: 2,
    name: 'Prof. Sita Sharma',
    department: 'CSE',
    status: 'available',
    office: 'Faculty Block A, Room 3',
    nextClass: {
      subject: 'Database Management',
      time: '2:00 PM',
      room: 'B205'
    }
  }
];

const Faculty = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFaculty = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    if (!normalizedQuery) {
      return FACULTY_DIRECTORY;
    }

    return FACULTY_DIRECTORY.filter((faculty) =>
      faculty.name.toLowerCase().includes(normalizedQuery) ||
      faculty.department.toLowerCase().includes(normalizedQuery)
    );
  }, [searchQuery]);

  return (
    <div className="faculty-page">
      <div className="faculty-header">
        <h2>Faculty Status</h2>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search faculty by name or department..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="faculty-grid">
        {filteredFaculty.map(faculty => (
          <div key={faculty.id} className="faculty-card">
            <div className="faculty-info">
              <div className="faculty-name">
                <FaUserTie />
                <h3>{faculty.name}</h3>
              </div>
              <p className="department">{faculty.department}</p>
              
              <div className={`status ${faculty.status}`}>
                {faculty.status === 'teaching' ? (
                  <>
                    <FaTimesCircle />
                    <span>In Class</span>
                  </>
                ) : (
                  <>
                    <FaCheckCircle />
                    <span>Available</span>
                  </>
                )}
              </div>
            </div>

            <div className="current-status">
              {faculty.status === 'teaching' ? (
                <>
                  <p>
                    <FaMapMarkerAlt />
                    Currently in Room {faculty.currentLocation}
                  </p>
                  <p>Teaching {faculty.currentClass}</p>
                  <p>Section: {faculty.section}</p>
                </>
              ) : (
                <p>
                  <FaMapMarkerAlt />
                  {faculty.office}
                </p>
              )}
            </div>

            <div className="next-class">
              <h4>
                <FaClock /> Next Class
              </h4>
              <p>{faculty.nextClass.subject}</p>
              <p>at {faculty.nextClass.time}</p>
              <p>Room {faculty.nextClass.room}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faculty;
