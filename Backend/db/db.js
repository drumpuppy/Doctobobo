const mysql = require("mysql2/promise");

const config = {
  db: {
    host: "localhost",
    user: "root",
    password: "mysql",
    database: "doctobobo",
    connectTimeout: 60000
  },
  //listPerPage: 10,
};

const connectToDB = async () => {
  try {
    const db = await mysql.createConnection(config.db);
    console.log("Connected to database Successfully!");
    return db
  } catch (error) {
    console.log({ message: "Error: Connection to database failed!", error });
  }
};

module.exports = connectToDB;