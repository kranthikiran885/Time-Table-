import React, { useState, useEffect } from 'react';
import { FaSearch, FaDownload, FaPrint, FaCalendarAlt } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import { format } from 'date-fns';
import { getTimetableData, subscribeToTimetable } from '../services/timetableService';
import './TimeTable.css';

const TimeTable = () => {
  const [searchType, setSearchType] = useState('section');
  const [searchQuery, setSearchQuery] = useState('');
  const [timetableData, setTimetableData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchQuery && searchType === 'section') {
      const unsubscribe = subscribeToTimetable(searchQuery.toUpperCase(), (data) => {
        setTimetableData(data);
      });

      return () => unsubscribe();
    }
  }, [searchQuery, searchType]);

  const handleSearch = async () => {
    if (!searchQuery) {
      toast.error('Please enter a search term');
      return;
    }

    setLoading(true);
    try {
      const data = await getTimetableData(searchQuery.toUpperCase());
      if (data) {
        setTimetableData(data);
        toast.success(`Found timetable for ${searchQuery.toUpperCase()}`);
      } else {
        toast.error('No results found');
      }
    } catch (error) {
      toast.error('Error fetching timetable data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4 items-center mb-6">
          <select
            className="input max-w-xs"
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
          >
            <option value="section">Search by Section</option>
            <option value="faculty">Search by Faculty</option>
            <option value="room">Search by Room</option>
          </select>

          <div className="relative flex-1">
            <input
              type="text"
              className="input pl-10"
              placeholder={`Enter ${searchType}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>

          <button
            className="btn btn-primary"
            onClick={handleSearch}
            disabled={loading}
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>

        {timetableData && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">
                {searchType === 'section' && `Section ${searchQuery.toUpperCase()}`}
                {searchType === 'faculty' && `Faculty Schedule`}
                {searchType === 'room' && `Room Schedule`}
              </h2>
              <div className="flex gap-2">
                <button className="btn btn-secondary">
                  <FaDownload className="mr-2" /> Export
                </button>
                <button className="btn btn-secondary" onClick={() => window.print()}>
                  <FaPrint className="mr-2" /> Print
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-700">
                    <th className="p-4 text-left">Time</th>
                    {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map(day => (
                      <th key={day} className="p-4 text-left">{day}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {timetableData.schedule && Object.entries(timetableData.schedule).map(([time, slots]) => (
                    <tr key={time} className="border-t border-gray-200 dark:border-gray-700">
                      <td className="p-4 font-medium">{time}</td>
                      {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map(day => (
                        <td key={day} className="p-4">
                          {slots[day]?.subject || '-'}
                          {slots[day]?.faculty && (
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              {slots[day].faculty}
                            </div>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TimeTable;