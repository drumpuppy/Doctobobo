const pool = require('../db');

exports.addPrescription = async (req, res) => {
    const { userId, doctorId, date, details } = req.body;
    try {
        const client = await pool.connect();
        const queryText = 'INSERT INTO prescriptions (user_id, doctor_id, date, details) VALUES ($1, $2, $3, $4) RETURNING *';
        const result = await client.query(queryText, [userId, doctorId, date, details]);
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error('Error adding prescription:', err);
        res.status(500).json({ message: 'Unable to add prescription due to server error.' });
    } finally {
        client.release();
    }
};

exports.updatePrescription = async (req, res) => {
    const { prescriptionId, details } = req.body; // Assume details field is what might be updated
    try {
        const client = await pool.connect();
        const queryText = 'UPDATE prescriptions SET details = $1 WHERE id = $2 RETURNING *';
        const result = await client.query(queryText, [details, prescriptionId]);
        if (result.rows.length > 0) {
            res.json(result.rows[0]);
        } else {
            res.status(404).json({ message: 'Prescription not found.' });
        }
    } catch (err) {
        console.error('Error updating prescription:', err);
        res.status(500).json({ message: 'Unable to update prescription due to server error.' });
    } finally {
        client.release();
    }
};
