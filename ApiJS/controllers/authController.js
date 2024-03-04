const pool = require('../db'); // Your PostgreSQL connection setup
const bcrypt = require('bcryptjs'); // For hashing passwords

exports.login = async (req, res) => {
  const { email, pwd, userType } = req.body;
  let client;

  try {
    client = await pool.connect();

    let tableName = userType === "docteur" ? "Medecin" : "Patient";
    let userIdColumn = userType === "docteur" ? "idMedecin" : "idPatient";
    let query = `SELECT * FROM ${tableName} WHERE email = $1`;

    const result = await client.query(query, [email]);

    if (result.rows.length > 0) {
      const user = result.rows[0];
      const isMatch = await bcrypt.compare(pwd, user.password);

      if (isMatch) {
        req.session.userId = user[userIdColumn];
        req.session.userType = userType;
        return res.json({ success: true });
      }
    }

    res.status(401).json({ success: false });
  } catch (err) {
    console.error('Server error', err);
    res.status(500).json({ message: 'Server error' });
  } finally {
    if (client) {
      client.release();
    }
  }
};

exports.logout = async (req, res) => {
  // Handle session/token destruction here
  res.status(200).json({ message: 'Logged out successfully' });
};

exports.register = async (req, res) => {
  const { email, pwd, userType, firstName, lastName, birthdate, speciality } = req.body;

  try {
    const userCreated = await createUser(userType, firstName, lastName, birthdate, email, pwd, speciality, pool);

    if (userCreated) {
      console.log("User successfully created.");
      return res.status(201).json({ success: true, message: "User registered successfully" });
    } else {
      return res.status(400).json({ success: false, message: "Failed to register user" });
    }
  } catch (error) {
    console.error("Registration error:", error);
    if (error.message === 'Email already exists') {
      return res.status(409).json({ success: false, message: "Email already exists" });
    } else if (error.message === 'Invalid birthdate format') {
      return res.status(400).json({ success: false, message: "Invalid birthdate format" });
    }
    return res.status(500).json({ success: false, message: "Server error during registration" });
  }
};



async function emailExists(email, userType, pool) {
  const table = userType === 'docteur' ? 'Medecin' : 'Patient';
  const client = await pool.connect();
  try {
    const result = await client.query(`SELECT * FROM ${table} WHERE email = $1`, [email]);
    return result.rowCount > 0;
  } finally {
    client.release();
  }
}


function isValidDate(date) {
  const regex = /^\d{2}\/\d{2}\/\d{4}$/;
  if (!date.match(regex)) return false;

  const [day, month, year] = date.split('/');
  const parsedDate = new Date(year, month - 1, day);
  return (
    parsedDate.getFullYear() == year &&
    parsedDate.getMonth() == month - 1 &&
    parsedDate.getDate() == day
  );
}

function convertDate(date) {
  const [day, month, year] = date.split('/');
  return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
}


async function createUser(userType, firstName, lastName, birthdate, email, password, speciality, pool) {
  if (!isValidDate(birthdate)) {
    throw new Error('Invalid birthdate format');
  }

  const convertedBirthdate = convertDate(birthdate);
  const hashedPwd = await bcrypt.hash(password, 10);

  if (await emailExists(email, userType, pool)) {
    throw new Error('Email already exists');
  }

  const client = await pool.connect();
  try {
    const sql =
      userType === 'docteur'
        ? 'INSERT INTO Medecin (Nom_Medecin, Prenom_Medecin, DateNaissance, Specialite, email, password) VALUES ($1, $2, $3, $4, $5, $6)'
        : 'INSERT INTO Patient (Nom_Patient, Prenom_Patient, DateNaissance, email, password) VALUES ($1, $2, $3, $4, $5)';
    const params =
      userType === 'docteur'
        ? [lastName, firstName, convertedBirthdate, speciality, email, hashedPwd]
        : [lastName, firstName, convertedBirthdate, email, hashedPwd];

    await client.query(sql, params);
    return true;
  } catch (error) {
    console.error('Error creating user:', error);
    return false;
  } finally {
    client.release();
  }
}
