const pool = require('../db');

exports.getPastAppointments = async (req, res) => {
  const userId = req.user.id;
  const currentDate = new Date().toISOString().slice(0, 10);

  try {
    const client = await pool.connect();
    const queryText = 'SELECT * FROM appointments WHERE user_id = $1 AND appointment_date < $2 ORDER BY appointment_date DESC';
    const result = await client.query(queryText, [userId, currentDate]);
    client.release();

    if (result.rows.length > 0) {
      res.json(result.rows);
    } else {
      res.status(404).json({ message: 'No past appointments found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
