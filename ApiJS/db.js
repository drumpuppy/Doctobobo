const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'doctobobo',
  password: 'postgres',
  port: 5432,
});

console.log("Database configuration:", {
  user: pool.options.user,
  host: pool.options.host,
  database: pool.options.database,
  port: pool.options.port,
});

pool.connect((err, client, release) => {
  if (err) {
    return console.error('Error acquiring client', err.stack);
  }
  console.log('Database connection successful');
  client.query('SELECT NOW()', (err, result) => {
    release();
    if (err) {
      return console.error('Error executing query', err.stack);
    }
    console.log('Connection test passed:', result.rows);
  });
});

module.exports = pool;
