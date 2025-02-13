// PORT API
const cors = require('cors');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
//Use Cors
app.use(cors());

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// DB


require('dotenv').config(); // Load environment variables from .env file
const sql = require('mssql');

const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  port: parseInt(process.env.DB_PORT),
options: {
    // Specify the protocol here (e.g., 'Named Pipes' or 'TCP/IP')
    encrypt: false, // Change this to true if you're using SSL/TLS
  },
};

async function connectToDB() {
  try {
    await sql.connect(dbConfig);
    console.log('Connected to SQL Server');
  } catch (error) {
    console.error('Error connecting to SQL Server:', error);
  }
}

connectToDB();

// index.js

// Define a route to fetch data from a table
app.get('/api/inv', async (req, res) => {
  try {
    const result = await sql.query('SELECT * FROM Eastlink_Web_API');
    res.json(result.recordset);
  } catch (error) {
    console.error('Error querying the database:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
// Define a route to fetch data from a table
// app.get('/api/credit', async (req, res) => {
//  try {
//    const result = await sql.query('SELECT * FROM View_Loyalty_Sytem_Credit_Data');
//    res.json(result.recordset);
//  } catch (error) {
//    console.error('Error querying the database:', error);
//    res.status(500).json({ error: 'Internal Server Error' });
//  }
// });
