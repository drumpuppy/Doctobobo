const pool = require('../db'); // Ensure this points to your database connection setup

exports.searchDoctor = async (req, res) => {
    const { specialty, name } = req.query; // Assuming search by specialty and/or name
    try {
        const client = await pool.connect();
        let queryText = 'SELECT * FROM doctors WHERE ';
        let queryParams = [];
        if (specialty) {
            queryText += 'specialty = $1';
            queryParams.push(specialty);
            if (name) {
                queryText += ' AND name ILIKE $2';
                queryParams.push(`%${name}%`);
            }
        } else if (name) {
            queryText += 'name ILIKE $1';
            queryParams.push(`%${name}%`);
        }
        const result = await client.query(queryText, queryParams);
        res.json(result.rows);
    } catch (err) {
        console.error('Error searching doctors:', err);
        res.status(500).json({ message: 'Unable to search doctors due to server error.' });
    } finally {
        client.release();
    }
};

exports.getSearchResult = async (req, res) => {
    const { specialty, name, location, available } = req.query; // Assuming additional filters like location and availability
    try {
        const client = await pool.connect();
        let queryParams = [];
        let queryConditions = [];
        let queryText = 'SELECT * FROM doctors';

        if (specialty) {
            queryConditions.push(`specialty = $${queryParams.length + 1}`);
            queryParams.push(specialty);
        }
        if (name) {
            queryConditions.push(`name ILIKE $${queryParams.length + 1}`);
            queryParams.push(`%${name}%`);
        }
        if (location) {
            queryConditions.push(`location = $${queryParams.length + 1}`);
            queryParams.push(location);
        }
        if (available !== undefined) {
            // Assuming 'available' is a boolean. Adjust the logic based on your actual data structure.
            queryConditions.push(`is_available = $${queryParams.length + 1}`);
            queryParams.push(available);
        }

        if (queryConditions.length > 0) {
            queryText += ' WHERE ' + queryConditions.join(' AND ');
        }

        const result = await client.query(queryText, queryParams);
        res.json(result.rows);
    } catch (err) {
        console.error('Error getting search results:', err);
        res.status(500).json({ message: 'Unable to get search results due to server error.' });
    } finally {
        client.release();
    }
};
