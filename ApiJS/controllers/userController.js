// controllers/userController.js
const pool = require('../db'); // Ensure this points to your database connection setup

exports.getUserData = async (req, res) => {
    const userId = req.params.userId; // Assuming user ID is passed as a route parameter
    try {
        const client = await pool.connect();
        const queryText = 'SELECT * FROM users WHERE id = $1';
        const result = await client.query(queryText, [userId]);
        if (result.rows.length > 0) {
            res.json(result.rows[0]);
        } else {
            res.status(404).json({ message: 'User not found.' });
        }
    } catch (err) {
        console.error('Error fetching user data:', err);
        res.status(500).json({ message: 'Unable to fetch user data due to server error.' });
    } finally {
        client.release();
    }
};

exports.updateUserInfo = async (req, res) => {
    const { userId, email, name, ...otherDetails } = req.body; // Extend with additional fields as necessary
    try {
        const client = await pool.connect();
        // Build an update query dynamically to handle varying fields
        const fields = [];
        const values = [];
        let queryText = 'UPDATE users SET ';
        if (email) {
            fields.push('email = $' + (fields.length + 1));
            values.push(email);
        }
        if (name) {
            fields.push('name = $' + (fields.length + 1));
            values.push(name);
        }
        // Add other fields dynamically...
        queryText += fields.join(', ') + ' WHERE id = $' + (fields.length + 1) + ' RETURNING *';
        values.push(userId);

        const result = await client.query(queryText, values);
        if (result.rows.length > 0) {
            res.json(result.rows[0]);
        } else {
            res.status(404).json({ message: 'User not found or no changes made.' });
        }
    } catch (err) {
        console.error('Error updating user info:', err);
        res.status(500).json({ message: 'Unable to update user info due to server error.' });
    } finally {
        client.release();
    }
};

