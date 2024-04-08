const express = require("express");
// const { nanoid } = require("nanoid");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const router = express.Router();

const { db } = global;

async function checkUserTableExists() {
  try {
    const tableCheckQuery = `SELECT EXISTS (
      SELECT 1
      FROM INFORMATION_SCHEMA.TABLES
      WHERE TABLE_NAME = 'User'
  ) AS table_exists;`;
    const result = await db.query(tableCheckQuery);

    return result[0][0].table_exists === 1;
  } catch (error) {
    console.error("Error checking if table exists:", error);
    return false;
  }
}

// Function to check if the Medecin table exists
async function checkMedecinTableExists() {
  try {
    const tableCheckQuery = `SELECT EXISTS (
      SELECT 1
      FROM INFORMATION_SCHEMA.TABLES
      WHERE TABLE_NAME = 'Medecin'
  ) AS table_exists;`;
    const result = await db.query(tableCheckQuery);
    return result[0][0].table_exists === 1;
  } catch (error) {
    console.error("Error checking if Medecin table exists:", error);
    return false;
  }
}
// Function to create the User table if it doesn't exist
async function createUserTableIfNotExists() {
  // console.log("createTableQuery");
  try {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS User (
        idPatient VARCHAR(255) PRIMARY KEY,
        Nom_Patient VARCHAR(255) NOT NULL,
        Prenom_Patient VARCHAR(255) NOT NULL,
        DateNaissance DATE NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        adresse VARCHAR(255) NOT NULL,
        code_postal VARCHAR(255) NOT NULL
      )
    `;
    await db.query(createTableQuery);
    console.log("User table created or already exists");
    return true;
  } catch (error) {
    console.error("Error creating User table:", error);
    return false;
  }
}
// Function to create the Medecin table if it doesn't exist
async function createMedecinTableIfNotExists() {
  try {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS Medecin (
        idMedecin VARCHAR(255) PRIMARY KEY,
        Nom_Medecin VARCHAR(255) NOT NULL,
        Prenom_Medecin VARCHAR(255) NOT NULL,
        DateNaissance DATE NOT NULL,
        Specialite VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        adresse VARCHAR(255) NOT NULL,
        code_postal VARCHAR(255) NOT NULL,
        description TEXT,
        availableTime JSON DEFAULT NULL
      )
    `;
    await db.query(createTableQuery);
    console.log("Medecin table created or already exists");
    return true;
  } catch (error) {
    console.error("Error creating Medecin table:", error);
    return false;
  }
}

// Middleware to ensure User and Medecin tables exist before processing requests
router.use(async (req, res, next) => {
  const userTableExists = await checkUserTableExists();
  const medecinTableExists = await checkMedecinTableExists();

  console.log("TableExist", userTableExists, medecinTableExists);
  try {
    if (!userTableExists) {
      await createUserTableIfNotExists();
    }

    if (!medecinTableExists) {
      await createMedecinTableIfNotExists();
    }
  } catch (err) {
    console.log(err);
  } finally {
    next();
  }
});

router.post("/signup", async (req, res) => {
  const {
    role,
    Nom,
    Prenom,
    DateNaissanceFormatted,
    email,
    password,
    adresse,
    code_postal,
    Specialite, // Only for doctors
    description, // Only for doctors
  } = req.body;
  console.log(req.body);
  try {
    const { nanoid } = await import("nanoid");
    createUserTableIfNotExists();
    createMedecinTableIfNotExists();
    if (role == "patient") {
      // Check if user with provided email already exists
      const findUserQuery = `SELECT * FROM User WHERE email = '${email}'`;
      const existingUser = (await db.query(findUserQuery))[0][0];
      if (existingUser) {
        return res
          .status(400)
          .send({ message: "User already exists", status: false });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
      // Use dynamic import to import nanoid
      const id = nanoid(); // Generate unique ID
      const addUserQuery = `INSERT INTO User (idPatient, Nom_Patient, Prenom_Patient, DateNaissance, email, password, adresse, code_postal) VALUES ('${id}','${Nom}','${Prenom}','${DateNaissanceFormatted}','${email}','${hashedPassword}','${adresse}','${code_postal}')`;
      await db.query(addUserQuery);
      return res
        .status(200)
        .send({ message: "User created successfully", status: true });
    } else {
      const findUserQuery = `SELECT * FROM Medecin WHERE email = '${email}'`;
      const existingUser = (await db.query(findUserQuery))[0][0];
      if (existingUser) {
        return res
          .status(400)
          .send({ message: "User already exists", status: false });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const idMedecin = nanoid(); // Generate unique doctor ID
      const addMedecinQuery = `
        INSERT INTO Medecin (idMedecin, Nom_Medecin, Prenom_Medecin, DateNaissance, Specialite, email, password, adresse, code_postal, description)
        VALUES ('${idMedecin}', '${Nom}', '${Prenom}', '${DateNaissanceFormatted}', '${Specialite}', '${email}', '${hashedPassword}', '${adresse}', '${code_postal}', '${description}')
        `;
      await db.query(addMedecinQuery);
      return res
        .status(200)
        .send({ message: "User created successfully", status: true });
    }
  } catch (error) {
    console.error("Error signing up user:", error);
    return res.status(500).send({ message: "Internal server error" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password, role } = req.body;
  try {
    let findUserQuery;
    if (role === "patient") {
      findUserQuery = `SELECT * FROM User WHERE email = '${email}'`;
    } else {
      findUserQuery = `SELECT * FROM Medecin WHERE email = '${email}'`;
    }
    const user = (await db.query(findUserQuery))[0][0];
    if (!user)
      return res.status(400).send({ message: "User not exists", status: 404 });

    // Compare hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch)
      return res
        .status(400)
        .send({ message: "Invalid credentials", status: 401 });
    console.log(user.idPatient);
    const token = jwt.sign(
      { user: { id: user.idPatient } },
      process.env.JWT_SECRET_Key
    );
    return res.status(200).send({
      message: "Login successful",
      data: { token, user },
      status: 200,
    });
  } catch (error) {
    console.error("Error logging in:", error.message);
    return res.status(500).send({ message: "Internal server error" });
  }
});

module.exports = router;
