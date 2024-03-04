const pool = require('../db'); // Ensure this points to your database connection setup

exports.bookAppointment = async (req, res) => {
    const { userId, doctorId, slotId, date } = req.body; // Assuming these details are passed in the request
    try {
        const client = await pool.connect();
        const queryText = 'INSERT INTO appointments (user_id, doctor_id, slot_id, date) VALUES ($1, $2, $3, $4) RETURNING *';
        const result = await client.query(queryText, [userId, doctorId, slotId, date]);
        client.release();
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error('Error booking appointment:', err);
        client.release();
        res.status(500).json({ message: 'Unable to book appointment due to server error.' });
    }
};

exports.getAppointments = async (req, res) => {
    const userId = req.query.userId; // Assuming user ID is passed as a query parameter
    try {
        const client = await pool.connect();
        const queryText = 'SELECT * FROM appointments WHERE user_id = $1';
        const result = await client.query(queryText, [userId]);
        client.release();
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching appointments:', err);
        client.release();
        res.status(500).json({ message: 'Unable to fetch appointments due to server error.' });
    }
};

exports.cancelAppointment = async (req, res) => {
    const { appointmentId } = req.body; // Assuming the appointment ID to cancel is passed in the request
    try {
        const client = await pool.connect();
        const queryText = 'DELETE FROM appointments WHERE id = $1 RETURNING *';
        const result = await client.query(queryText, [appointmentId]);
        client.release();
        if (result.rows.length > 0) {
            res.json({ message: 'Appointment canceled successfully.' });
        } else {
            res.status(404).json({ message: 'Appointment not found.' });
        }
    } catch (err) {
        console.error('Error canceling appointment:', err);
        client.release();
        res.status(500).json({ message: 'Unable to cancel appointment due to server error.' });
    }
};

exports.getAvailableSlots = async (req, res) => {
    const { doctorId, date } = req.query; // Assuming doctor ID and date are passed as query parameters
    try {
        const client = await pool.connect();
        const queryText = 'SELECT * FROM slots WHERE doctor_id = $1 AND date = $2 AND slot_id NOT IN (SELECT slot_id FROM appointments WHERE doctor_id = $1 AND date = $2)';
        const result = await client.query(queryText, [doctorId, date]);
        client.release();
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching available slots:', err);
        client.release();
        res.status(500).json({ message: 'Unable to fetch available slots due to server error.' });
    }
};

