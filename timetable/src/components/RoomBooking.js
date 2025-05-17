import React, { useState } from 'react';
import { FaCalendarAlt, FaClock, FaCheck, FaTimes } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import './RoomBooking.css';

const RoomBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [newBooking, setNewBooking] = useState({
    room: '',
    date: '',
    startTime: '',
    endTime: '',
    purpose: '',
    faculty: ''
  });

  const rooms = ['101', '102', '103', 'Lab-1', 'Lab-2', 'Conference Room'];

  const isRoomAvailable = (room, date, startTime, endTime) => {
    return !bookings.some(booking => 
      booking.room === room &&
      booking.date === date &&
      ((startTime >= booking.startTime && startTime < booking.endTime) ||
       (endTime > booking.startTime && endTime <= booking.endTime))
    );
  };

  const handleBooking = () => {
    const { room, date, startTime, endTime, purpose, faculty } = newBooking;

    if (!room || !date || !startTime || !endTime || !purpose || !faculty) {
      toast.error('Please fill in all fields');
      return;
    }

    if (startTime >= endTime) {
      toast.error('End time must be after start time');
      return;
    }

    if (!isRoomAvailable(room, date, startTime, endTime)) {
      toast.error('Room is already booked for this time slot');
      return;
    }

    setBookings([...bookings, { ...newBooking, id: Date.now() }]);
    setNewBooking({
      room: '',
      date: '',
      startTime: '',
      endTime: '',
      purpose: '',
      faculty: ''
    });
    toast.success('Room booked successfully');
  };

  return (
    <div className="room-booking">
      <h3>Room Booking System</h3>
      
      <div className="booking-form">
        <div className="form-group">
          <label>Room:</label>
          <select
            value={newBooking.room}
            onChange={(e) => setNewBooking({ ...newBooking, room: e.target.value })}
          >
            <option value="">Select Room</option>
            {rooms.map(room => (
              <option key={room} value={room}>{room}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Date:</label>
          <input
            type="date"
            value={newBooking.date}
            onChange={(e) => setNewBooking({ ...newBooking, date: e.target.value })}
            min={new Date().toISOString().split('T')[0]}
          />
        </div>

        <div className="form-group">
          <label>Start Time:</label>
          <input
            type="time"
            value={newBooking.startTime}
            onChange={(e) => setNewBooking({ ...newBooking, startTime: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label>End Time:</label>
          <input
            type="time"
            value={newBooking.endTime}
            onChange={(e) => setNewBooking({ ...newBooking, endTime: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label>Purpose:</label>
          <input
            type="text"
            value={newBooking.purpose}
            onChange={(e) => setNewBooking({ ...newBooking, purpose: e.target.value })}
            placeholder="Extra class, Lab session, etc."
          />
        </div>

        <div className="form-group">
          <label>Faculty:</label>
          <input
            type="text"
            value={newBooking.faculty}
            onChange={(e) => setNewBooking({ ...newBooking, faculty: e.target.value })}
            placeholder="Faculty name"
          />
        </div>

        <button onClick={handleBooking} className="book-room-btn">
          <FaCalendarAlt /> Book Room
        </button>
      </div>

      <div className="bookings-list">
        <h4>Current Bookings</h4>
        {bookings.map(booking => (
          <div key={booking.id} className="booking-item">
            <div className="booking-header">
              <h5>Room {booking.room}</h5>
              <span className={`status ${isRoomAvailable(booking.room, booking.date, booking.startTime, booking.endTime) ? 'available' : 'booked'}`}>
                {isRoomAvailable(booking.room, booking.date, booking.startTime, booking.endTime) ? (
                  <><FaCheck /> Available</>
                ) : (
                  <><FaTimes /> Booked</>
                )}
              </span>
            </div>
            <div className="booking-details">
              <p><FaCalendarAlt /> {booking.date}</p>
              <p><FaClock /> {booking.startTime} - {booking.endTime}</p>
              <p>Purpose: {booking.purpose}</p>
              <p>Faculty: {booking.faculty}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoomBooking;
