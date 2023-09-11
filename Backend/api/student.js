const express = require('express');
const router = express.Router();
const connection = require('../dbconnection/dbconnection');

// Route to add a new student
router.post('', (req, res) => {
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
router.get('', (req, res) => {
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

router.get('/:studentid*', (req, res) => {
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

// Update student details API endpoint
router.put('/:studentid*', (req, res) => {
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

router.delete('/:studentid*', (req, res) => {
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

module.exports = router;
