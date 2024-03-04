import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/meeting.css'; // Ensure the CSS file is imported correctly

function Meeting() {
    const [appointments, setAppointments] = useState([]);
    const [userType] = useState(localStorage.getItem('user_type'));

    const fetchAppointments = async () => {
        try {
            const response = await axios.get('http://localhost:4000/api/appointments', {
                params: { userType }
            });
            setAppointments(response.data.appointments || []);
        } catch (error) {
            console.error('Failed to fetch appointments:', error);
        }
    };

    useEffect(() => {
        fetchAppointments();
    }, [fetchAppointments]);

    const cancelAppointment = async (appointmentId) => {
        try {
            // Update the URL to include the correct port number
            await axios.post('http://localhost:4000/api/cancel-appointment', { appointmentId });
            // Refresh appointments list after cancellation
            fetchAppointments();
            alert('Appointment canceled successfully.');
        } catch (error) {
            console.error('Failed to cancel appointment:', error);
            alert('Failed to cancel the appointment.');
        }
    };

    return (
        <div className="mes_rdv">
            <h1>Mes prochains rendez-vous :</h1>
            <div id="appointments">
                {appointments.length === 0 ? (
                    <p>Aucun rendez-vous trouvé.</p>
                ) : (
                    appointments.map((appointment) => (
                        <div key={appointment.id}>
                            <p>Date: {appointment.date}</p>
                            <p>Heure: {appointment.time}</p>
                            <p>{userType === 'docteur' ? `Patient: ${appointment.patientName}` : `Docteur: ${appointment.doctorName}`}</p>
                            <button className="cancel-btn" onClick={() => cancelAppointment(appointment.id)}>Annuler</button>
                            <hr />
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default Meeting;
