const { Pool } = require('pg');

// Configure the connection
const pool = new Pool({
  user: 'postgresql',
  host: 'localhost', // or the server's IP address
  database: 'yourDatabaseName',
  password: 'root',
  port: 5432, // Default PostgreSQL port
});

// Querying the database
async function connectToDatabase() {
  try {
    // Test the connection
    const client = await pool.connect();
    console.log('Connected to PostgreSQL database');

    // Example query
    const result = await client.query('SELECT NOW() AS current_time');
    console.log('Current time from database:', result.rows[0].current_time);

    // Release the client
    client.release();
  } catch (error) {
    console.error('Error connecting to PostgreSQL:', error.message);
  } finally {
    await pool.end(); // Close the connection pool when done
  }
}

// Run the connection function
// connectToDatabase();
