import React, { useState } from 'react';
import { FaGraduationCap, FaClock, FaUserTie, FaMapMarkerAlt, FaBook, FaCalendarAlt, FaDownload, FaPrint } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import './ClassView.css';

const ClassView = () => {
  const [selectedSection, setSelectedSection] = useState('CSE-A');
  const [viewMode, setViewMode] = useState('weekly');

  // Sample class data - In a real app, this would come from an API
  const classData = {
    'CSE-A': {
      section: 'CSE-A',
      semester: 6,
      classTeacher: 'Dr. Ramesh Kumar',
      totalStudents: 60,
      currentClass: {
        subject: 'Computer Networks',
        faculty: 'Dr. Ramesh Kumar',
        room: 'A101',
        startTime: '10:00 AM',
        endTime: '11:00 AM'
      },
      nextClass: {
        subject: 'Database Management',
        faculty: 'Prof. Sita Sharma',
        room: 'B205',
        startTime: '11:00 AM',
        endTime: '12:00 PM'
      },
      weeklySchedule: [
        {
          day: 'Monday',
          classes: [
            { time: '9:00 AM - 10:00 AM', subject: 'Operating Systems', faculty: 'Dr. John Smith', room: 'A102', type: 'theory' },
            { time: '10:00 AM - 11:00 AM', subject: 'Computer Networks', faculty: 'Dr. Ramesh Kumar', room: 'A101', type: 'theory' },
            { time: '11:00 AM - 12:00 PM', subject: 'Database Lab', faculty: 'Prof. Sita Sharma', room: 'LAB-1', type: 'lab' },
            { time: '2:00 PM - 3:00 PM', subject: 'Software Engineering', faculty: 'Dr. Emily Brown', room: 'B201', type: 'theory' }
          ]
        },
        // Add other days similarly
      ],
      announcements: [
        {
          id: 1,
          title: 'Mid-Semester Exam Schedule',
          content: 'Mid-semester examinations will begin from April 15th, 2025',
          date: '2025-04-01',
          priority: 'high'
        },
        {
          id: 2,
          title: 'Project Submission Deadline',
          content: 'Submit your semester projects by April 10th, 2025',
          date: '2025-04-01',
          priority: 'medium'
        }
      ],
      attendance: {
        overall: 85,
        subjects: {
          'Computer Networks': 88,
          'Database Management': 82,
          'Operating Systems': 85,
          'Software Engineering': 90
        }
      }
    }
    // Add other sections similarly
  };

  const availableSections = Object.keys(classData);
  const selectedClassData = classData[selectedSection] || classData[availableSections[0]];
  const currentDayName = new Date().toLocaleDateString('en-US', { weekday: 'long' });
  const currentDaySchedule = selectedClassData?.weeklySchedule.find((day) => day.day === currentDayName) || selectedClassData?.weeklySchedule[0];
  const scheduleToRender = viewMode === 'weekly' ? selectedClassData?.weeklySchedule || [] : currentDaySchedule ? [currentDaySchedule] : [];

  const handleExport = (format) => {
    // In a real app, this would generate and download the file
    toast.success(`Timetable exported as ${format.toUpperCase()}`);
  };

  const handlePrint = () => {
    window.print();
  };

  if (!selectedClassData) {
    return (
      <div className="class-view empty-state">
        <h2>No class information available</h2>
        <p>Please select a valid section to view details.</p>
      </div>
    );
  }

  return (
    <div className="class-view">
      <div className="class-header">
        <div className="section-info">
          <div className="section-selection">
            <label htmlFor="section-selector">Section</label>
            <select
              id="section-selector"
              value={selectedSection}
              onChange={(event) => setSelectedSection(event.target.value)}
            >
              {availableSections.map((section) => (
                <option key={section} value={section}>{section}</option>
              ))}
            </select>
          </div>
          <h2><FaGraduationCap /> {selectedSection}</h2>
          <div className="section-meta">
            <span>Semester {selectedClassData.semester}</span>
            <span>{selectedClassData.totalStudents} Students</span>
            <span>Class Teacher: {selectedClassData.classTeacher}</span>
          </div>
        </div>

        <div className="actions">
          <button onClick={() => handleExport('pdf')} className="action-btn">
            <FaDownload /> Export PDF
          </button>
          <button onClick={() => handleExport('excel')} className="action-btn">
            <FaDownload /> Export Excel
          </button>
          <button onClick={handlePrint} className="action-btn">
            <FaPrint /> Print
          </button>
        </div>
      </div>

      <div className="class-content">
        <div className="current-status">
          <div className="status-card current-class">
            <h3><FaClock /> Current Class</h3>
            {selectedClassData.currentClass && (
              <>
                <h4>{selectedClassData.currentClass.subject}</h4>
                <p><FaUserTie /> {selectedClassData.currentClass.faculty}</p>
                <p><FaMapMarkerAlt /> Room {selectedClassData.currentClass.room}</p>
                <p><FaClock /> {selectedClassData.currentClass.startTime} - {selectedClassData.currentClass.endTime}</p>
              </>
            )}
          </div>

          <div className="status-card next-class">
            <h3><FaClock /> Next Class</h3>
            {selectedClassData.nextClass && (
              <>
                <h4>{selectedClassData.nextClass.subject}</h4>
                <p><FaUserTie /> {selectedClassData.nextClass.faculty}</p>
                <p><FaMapMarkerAlt /> Room {selectedClassData.nextClass.room}</p>
                <p><FaClock /> {selectedClassData.nextClass.startTime} - {selectedClassData.nextClass.endTime}</p>
              </>
            )}
          </div>

          <div className="status-card attendance">
            <h3><FaGraduationCap /> Attendance Overview</h3>
            <div className="attendance-overall">
              <div className="attendance-circle">
                <svg viewBox="0 0 36 36">
                  <path
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#eee"
                    strokeWidth="3"
                  />
                  <path
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="var(--primary-color)"
                    strokeWidth="3"
                    strokeDasharray={`${selectedClassData.attendance.overall}, 100`}
                  />
                </svg>
                <div className="percentage">{selectedClassData.attendance.overall}%</div>
              </div>
              <p>Overall Attendance</p>
            </div>
            <div className="attendance-subjects">
              {Object.entries(selectedClassData.attendance.subjects).map(([subject, percentage]) => (
                <div key={subject} className="subject-attendance">
                  <span>{subject}</span>
                  <div className="progress-bar">
                    <div className="progress" style={{ width: `${percentage}%` }}></div>
                  </div>
                  <span>{percentage}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="schedule-section">
          <div className="schedule-header">
            <h3><FaCalendarAlt /> Class Schedule</h3>
            <div className="view-controls">
              <button
                className={`view-btn ${viewMode === 'weekly' ? 'active' : ''}`}
                onClick={() => setViewMode('weekly')}
              >
                Weekly View
              </button>
              <button
                className={`view-btn ${viewMode === 'daily' ? 'active' : ''}`}
                onClick={() => setViewMode('daily')}
              >
                Daily View
              </button>
            </div>
          </div>

          <div className="schedule-content">
            {scheduleToRender.length === 0 && (
              <p className="no-schedule">No schedule available for the selected view.</p>
            )}
            {scheduleToRender.map((day) => (
              <div key={day.day} className="schedule-day">
                <h4>{day.day}</h4>
                <div className="day-classes">
                  {day.classes.map((classItem, classIndex) => (
                    <div key={`${day.day}-${classIndex}`} className={`class-item ${classItem.type}`}>
                      <div className="class-time">{classItem.time}</div>
                      <div className="class-details">
                        <h5>{classItem.subject}</h5>
                        <p><FaUserTie /> {classItem.faculty}</p>
                        <p><FaMapMarkerAlt /> Room {classItem.room}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="announcements-section">
          <h3><FaBook /> Important Announcements</h3>
          <div className="announcements-list">
            {selectedClassData.announcements.map(announcement => (
              <div key={announcement.id} className={`announcement-card priority-${announcement.priority}`}>
                <div className="announcement-header">
                  <h4>{announcement.title}</h4>
                  <span className="date">{new Date(announcement.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: '2-digit',
                    year: 'numeric'
                  })}</span>
                </div>
                <p>{announcement.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassView;
