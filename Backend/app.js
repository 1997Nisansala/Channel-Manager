// Import necessary modules
const mysql = require('mysql2');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors({
    origin: 'http://localhost:3001', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  }));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// MySQL connection configuration
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',   
  password: '', 
  database: 'student3',
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});


// Route to add a new student
app.post('/api/students', (req, res) => {
  const { studentid, firstName, lastName, email, address, course } = req.body;
  const sql = 'INSERT INTO students_details (studentid, firstName, lastName, email, address, course) VALUES (?, ?, ?, ?, ?, ?)';
  const values = [studentid, firstName, lastName, email, address, course];

  connection.query(sql, values, (err, results) => {
    if (err) {
      console.error('Error inserting student:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    console.log('Student added successfully');
    res.json({ message: 'Student added successfully' });
  });
});

// Route to get a list of all students
app.get('/api/students', (req, res) => {
  const sql = 'SELECT * FROM students_details';

  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching students:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    res.json(results);
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
