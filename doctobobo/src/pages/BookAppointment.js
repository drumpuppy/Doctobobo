import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/book_appointment.css'; // Adjust the path as needed

function BookAppointment() {
    const [appointmentDate, setAppointmentDate] = useState('');
    const [appointmentTime, setAppointmentTime] = useState('');
    const [availableTimes, setAvailableTimes] = useState([]);
    const [doctorId, setDoctorId] = useState('');

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const doctorIdFromUrl = urlParams.get('id');
        setDoctorId(doctorIdFromUrl);
        // Fetch available times whenever the doctorId or date changes
        if (doctorId && appointmentDate) {
            fetchAvailableTimes(doctorId, appointmentDate);
        }
    }, [doctorId, appointmentDate]);

    const fetchAvailableTimes = async (doctorId, date) => {
        try {
            // Update the URL to include the correct port number
            const response = await axios.get(`http://localhost:4000/api/available-slots?doctorId=${doctorId}&date=${date}`);
            setAvailableTimes(response.data);
        } catch (error) {
            console.error('Failed to fetch available times:', error);
            setAvailableTimes([]);
        }
    };

    const handleBooking = async () => {
        try {
            // Update the URL to include the correct port number
            await axios.post('http://localhost:4000/api/book-appointment', {
                doctorId,
                date: appointmentDate,
                time: appointmentTime,
            });
            alert('Appointment successfully booked!');
            // Reset form or redirect as needed
        } catch (error) {
            console.error('Failed to book the appointment:', error);
            alert('Failed to book the appointment.');
        }
    };

    return (
        <div className="book-appointment">
            <h1>Book Appointment</h1>
            <div>
                <label htmlFor="appointmentDate">Date:</label>
                <input
                    type="date" // Using a date picker for better UX
                    id="appointmentDate"
                    name="appointmentDate"
                    value={appointmentDate}
                    onChange={(e) => setAppointmentDate(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="appointmentTime">Time:</label>
                <select
                    id="appointmentTime"
                    name="appointmentTime"
                    value={appointmentTime}
                    onChange={(e) => setAppointmentTime(e.target.value)}
                    required
                >
                    {availableTimes.map((time) => (
                        <option key={time} value={time}>{time}</option>
                    ))}
                </select>
            </div>
            <button onClick={handleBooking}>Book</button>
        </div>
    );
}

export default BookAppointment;
