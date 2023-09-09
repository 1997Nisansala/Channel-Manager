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
  const { studentid, firstName, lastName, email, address, course_ids } = req.body;

  // Check if course_ids is an array and contains valid course IDs
  if (!Array.isArray(course_ids) || course_ids.length === 0) {
    res.status(400).json({ error: 'Invalid or empty course_ids' });
    return;
  }

  // Insert the student record into the "students_details" table
  const sql = 'INSERT INTO students_details (studentid, firstName, lastName, email, address) VALUES (?, ?, ?, ?, ?)';
  const values = [studentid, firstName, lastName, email, address];

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error inserting student:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    const studentId = result.insertId;
    const insertCourseQuery = 'UPDATE students_details SET course_id1 = ?, course_id2 = ?, course_id3 = ? WHERE id = ?';

    // Slice the course_ids array to ensure only the first 3 IDs are used
    const courseValues = course_ids.slice(0, 3).concat([studentId]);

    connection.query(insertCourseQuery, courseValues, (err) => {
      if (err) {
        console.error('Error updating student courses:', err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }

      console.log('Student added successfully');
      res.json({ message: 'Student added successfully' });
    });
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

app.get('/api/students/:studentid*', (req, res) => {
  const { studentid } = req.params;
  const fullStudentId = studentid + (req.params[0] || ''); 
  const sql = 'SELECT * FROM students_details WHERE studentid = ?';

  connection.query(sql, [fullStudentId], (err, results) => {
    if (err) {
      console.error('Error searching for student:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    if (results.length === 0) {
      res.status(404).json({ message: 'Student not found' });
    } else {
      res.json(results[0]);
    }
  });
});

// Route to get a list of all courses
app.get('/api/courses', (req, res) => {
  const sql = 'SELECT * FROM course';

  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching courses:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    res.json(results);
  });
});

// Update student details API endpoint
app.put('/api/students/:studentid*', (req, res) => {
  const { studentid } = req.params;
  const fullStudentId = studentid + (req.params[0] || '');
  const updatedStudentData = req.body;
  const course_ids = updatedStudentData.course_ids || [];
  const [course_id1, course_id2, course_id3] = course_ids.slice(0, 3);

  const updatedDataWithoutCourses = { ...updatedStudentData };
  delete updatedDataWithoutCourses.course_ids;

  const sql =
    'UPDATE students_details SET ?, course_id1 = ?, course_id2 = ?, course_id3 = ? WHERE studentid = ?';

  connection.query(
    sql,
    [updatedDataWithoutCourses, course_id1, course_id2, course_id3, fullStudentId],
    (err, results) => {
      if (err) {
        console.error('Error updating student details:', err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }

      if (results.affectedRows === 0) {
        res.status(404).json({ message: 'Student not found' });
      } else {
        res.json({ message: 'Student details updated successfully' });
      }
    }
  );
});

app.delete('/api/students/:studentid*', (req, res) => {
  const { studentid } = req.params;
  const fullStudentId = studentid + (req.params[0] || ''); 
  const sql = 'DELETE FROM students_details WHERE studentid = ?';

  connection.query(sql, [fullStudentId], (err, results) => {
    if (err) {
      console.error('Error deleting student:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    if (results.affectedRows === 0) {
      res.status(404).json({ message: 'Student not found' });
    } else {
      res.json({ message: 'Student deleted successfully' });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
