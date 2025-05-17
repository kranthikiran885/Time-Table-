import React, { useState, useEffect } from 'react';
import { FaSearch, FaDownload, FaPrint, FaCalendarAlt, FaClock, FaFilter, FaFileExcel, FaFilePdf, FaChalkboardTeacher, FaDoorOpen, FaUserGraduate } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import { format } from 'date-fns';
import {
  getFacultyData,
  getTimeSlots,
  getDays,
  getSectionData,
  getCurrentClass,
  getNextClass,
  findFacultySchedule,
  findRoomSchedule
} from '../data/timetableLoader';
import './TimeTable.css';

const TimeTable = () => {
  const [searchType, setSearchType] = useState('section');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState(null);
  const [viewMode, setViewMode] = useState('weekly');
  const [loading, setLoading] = useState(false);
  const [currentTime] = useState(new Date());

  const handleSearch = () => {
    setLoading(true);
    setTimeout(() => {
      let result = null;
      
      switch (searchType) {
        case 'section': {
          const sectionData = getSectionData(searchQuery.toUpperCase());
          if (sectionData) {
            const current = getCurrentClass(searchQuery.toUpperCase());
            const next = getNextClass(searchQuery.toUpperCase());
            result = {
              ...sectionData,
              currentClass: current,
              nextClass: next
            };
            toast.success(`Found timetable for Section ${searchQuery.toUpperCase()}`);
          }
          break;
        }
        case 'faculty': {
          const facultySchedule = findFacultySchedule(searchQuery.trim());
          if (Object.keys(facultySchedule.schedule).length > 0) {
            result = facultySchedule;
            toast.success(`Found schedule for ${searchQuery}`);
          }
          break;
        }
        case 'room': {
          const roomSchedule = findRoomSchedule(searchQuery.toUpperCase());
          if (roomSchedule) {
            result = roomSchedule;
            toast.success(`Found schedule for Room ${searchQuery.toUpperCase()}`);
          }
          break;
        }
        default:
          break;
      }

      setFilteredData({ type: searchType, data: result });
      setLoading(false);
      if (!result) {
        toast.error('No results found');
      }
    }, 500);
  };

  const renderCurrentStatus = () => {
    if (!filteredData?.data) return null;

    switch (filteredData.type) {
      case 'section': {
        const { currentClass, nextClass } = filteredData.data;
        return (
          <div className="status-card">
            <h3>
              <FaUserGraduate /> Section {searchQuery.toUpperCase()}
            </h3>
            <div className="status-details">
              {currentClass ? (
                <>
                  <p>
                    <strong>Current Class:</strong> {currentClass.subject}
                    <br />
                    <strong>Time:</strong> {currentClass.time}
                    <br />
                    <strong>Faculty:</strong> {currentClass.faculty}
                  </p>
                  {nextClass && (
                    <p className="next-class">
                      <strong>Next Class:</strong> {nextClass.subject}
                      <br />
                      <strong>Time:</strong> {nextClass.time}
                      <br />
                      <strong>Faculty:</strong> {nextClass.faculty}
                    </p>
                  )}
                </>
              ) : (
                <p>No ongoing class at the moment</p>
              )}
            </div>
          </div>
        );
      }

      case 'faculty': {
        const { currentClass, nextClass, schedule } = filteredData.data;
        
        // Find current room and section
        let currentRoom = '';
        let currentSection = '';
        
        if (currentClass) {
          Object.entries(getSectionData()).forEach(([section, data]) => {
            if (data.schedule[format(currentTime, 'EEEE')]?.[currentClass.time] === currentClass.subject) {
              currentSection = section;
              currentRoom = data.roomNumber;
            }
          });
        }

        return (
          <div className="status-card">
            <h3>
              <FaChalkboardTeacher /> Faculty Schedule
            </h3>
            <div className="status-details">
              {currentClass ? (
                <>
                  <p className="faculty-status">
                    <strong>{searchQuery}</strong> is currently teaching{' '}
                    <strong>'{currentClass.subject}'</strong>{' '}
                    {currentRoom && <>in Room <strong>{currentRoom}</strong></>}{' '}
                    {currentSection && <>for Section <strong>{currentSection}</strong></>}
                  </p>
                  <p className="time-info">
                    <FaClock /> Time: {currentClass.time}
                  </p>
                  {nextClass && (
                    <div className="next-class">
                      <p>
                        <strong>Next Class:</strong>
                      </p>
                      <p>
                        <strong>Subject:</strong> {nextClass.subject}
                        <br />
                        <strong>Time:</strong> {nextClass.time}
                        <br />
                        <strong>Section:</strong> {nextClass.section}
                      </p>
                    </div>
                  )}
                </>
              ) : (
                <p className="no-class">No ongoing class at the moment</p>
              )}
            </div>
          </div>
        );
      }

      case 'room': {
        const { currentClass, section, isOccupied } = filteredData.data;
        return (
          <div className="status-card">
            <h3>
              <FaDoorOpen /> Room {searchQuery.toUpperCase()}
            </h3>
            <div className="status-details">
              {isOccupied ? (
                <p>
                  <strong>Currently Occupied</strong>
                  <br />
                  <strong>Subject:</strong> {currentClass.subject}
                  <br />
                  <strong>Time:</strong> {currentClass.time}
                  <br />
                  <strong>Section:</strong> {section}
                  <br />
                  <strong>Faculty:</strong> {currentClass.faculty}
                </p>
              ) : (
                <p className="available">Room is currently available</p>
              )}
            </div>
          </div>
        );
      }

      default:
        return null;
    }
  };

  const renderSchedule = () => {
    if (!filteredData?.data?.schedule) return null;

    const schedule = filteredData.data.schedule;
    const days = viewMode === 'daily' ? [format(currentTime, 'EEEE')] : getDays();
    const timeSlots = getTimeSlots();

    return (
      <div className="schedule-container">
        <div className="schedule-header">
          <h3>
            <FaCalendarAlt />
            {viewMode === 'weekly' ? ' Weekly Schedule' : ' Today\'s Schedule'}
          </h3>
          <div className="schedule-actions">
            <button onClick={() => setViewMode('weekly')} className={`view-btn ${viewMode === 'weekly' ? 'active' : ''}`}>
              Weekly View
            </button>
            <button onClick={() => setViewMode('daily')} className={`view-btn ${viewMode === 'daily' ? 'active' : ''}`}>
              Daily View
            </button>
          </div>
        </div>

        <table className="schedule-table">
          <thead>
            <tr>
              <th>Time</th>
              {days.map(day => (
                <th key={day}>{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {timeSlots.map(timeSlot => (
              <tr key={timeSlot}>
                <td className="time-cell">{timeSlot}</td>
                {days.map(day => {
                  const subject = schedule[day]?.[timeSlot];
                  if (!subject) return <td key={day}>-</td>;

                  const subjectName = typeof subject === 'string' ? subject : subject.subject;
                  const faculty = getFacultyData()[subjectName];
                  const isBreak = subjectName.toLowerCase().includes('break');
                  const isLab = subjectName.toLowerCase().includes('lab');

                  let cellClass = 'subject-cell';
                  if (isBreak) cellClass = 'break-cell';
                  else if (isLab) cellClass = 'lab-cell';
                  else cellClass = 'theory-cell';

                  return (
                    <td key={day} className={cellClass}>
                      {isBreak ? (
                        'Break'
                      ) : (
                        <>
                          <span className="subject-name">{subjectName}</span>
                          {faculty && <span className="subject-faculty">{faculty}</span>}
                        </>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const exportToExcel = () => {
    if (!filteredData?.data?.schedule) return;

    const scheduleData = Object.entries(filteredData.data.schedule).flatMap(([day, slots]) =>
      Object.entries(slots).map(([time, details]) => {
        const subject = typeof details === 'string' ? details : details.subject;
        const section = typeof details === 'string' ? searchQuery.toUpperCase() : details.section;
        return {
          Day: day,
          Time: time,
          Subject: subject,
          Faculty: getFacultyData()[subject] || 'N/A',
          Section: section
        };
      })
    );

    const ws = XLSX.utils.json_to_sheet(scheduleData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Timetable');
    XLSX.writeFile(wb, `timetable-${searchType}-${searchQuery}.xlsx`);
    toast.success('Timetable exported as Excel');
  };

  const exportToPDF = () => {
    if (!filteredData?.data?.schedule) return;

    const doc = new jsPDF();
    doc.text(`Timetable - ${searchType.toUpperCase()}: ${searchQuery.toUpperCase()}`, 20, 10);
    // Add more PDF generation logic here
    doc.save(`timetable-${searchType}-${searchQuery}.pdf`);
    toast.success('Timetable exported as PDF');
  };

  return (
    <div className="timetable-container">
      <div className="search-section">
        <div className="search-header">
          <h2>Timetable Search</h2>
          <div className="export-actions">
            <button onClick={exportToExcel} className="export-btn" disabled={!filteredData?.data?.schedule}>
              <FaFileExcel /> Export Excel
            </button>
            <button onClick={exportToPDF} className="export-btn" disabled={!filteredData?.data?.schedule}>
              <FaFilePdf /> Export PDF
            </button>
            <button onClick={() => window.print()} className="export-btn" disabled={!filteredData?.data?.schedule}>
              <FaPrint /> Print
            </button>
          </div>
        </div>

        <div className="search-controls">
          <div className="search-type">
            <FaFilter />
            <select value={searchType} onChange={(e) => setSearchType(e.target.value)}>
              <option value="section">Search by Section</option>
              <option value="faculty">Search by Faculty</option>
              <option value="room">Search by Room</option>
            </select>
          </div>

          <div className="search-input">
            <FaSearch />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Enter ${searchType} ${searchType === 'section' ? '(A-S)' : ''}...`}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>

          <button onClick={handleSearch} className="search-btn" disabled={loading}>
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </div>

      {filteredData && (
        <div className="results-section">
          {renderCurrentStatus()}
          {renderSchedule()}
        </div>
      )}
    </div>
  );
};

export default TimeTable;
