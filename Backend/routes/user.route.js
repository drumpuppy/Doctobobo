const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const bcrypt = require("bcrypt");
const { db } = global;

router.get("/current-user", async (req, res) => {
  try {
    // Get the token from the request header
    const token =
      req.headers.authorization && req.headers.authorization.split(" ")[1];

    // If token doesn't exist, return unauthorized
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_Key);

    // Extract user ID from decoded token
    const userId = decoded.user.id;
    console.log(userId, process.env.JWT_SECRET_Key, decoded);

    // Determine if the user is a patient or a doctor
    let user;
    if (decoded.user.role === "patient") {
      // Query the database to get patient information
      const getUserQuery = 'SELECT * FROM User WHERE id = ?';
      user = (await db.promise().query(getUserQuery, [userId]))[0][0];
    } else {
      // Query the database to get doctor information
      const getDoctorQuery = 'SELECT * FROM Medecin WHERE idMedecin = ?';
      user = (await db.promise().query(getDoctorQuery, [userId]))[0][0];
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return user information
    res.status(200).json({ user });
  } catch (error) {
    console.error("Error getting current user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
