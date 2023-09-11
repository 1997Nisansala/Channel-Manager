const express = require('express');
const router = express.Router();
const connection = require('../dbconnection/dbconnection');

// Route to get a list of all courses
router.get('', (req, res) => {
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

  router.post('/add', (req, res) => {
    const { course_id, course_name, course_description } = req.body;
    const sql = 'INSERT INTO course (course_id, course_name, course_description) VALUES (?, ?, ?)';
  
    connection.query(sql, [course_id, course_name, course_description], (err, result) => {
      if (err) {
        console.error('Error adding a course:', err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
      res.json({ message: 'Course added successfully', courseId: result.insertId });
    });
  });

  router.put('/update/:id', (req, res) => {
    const courseId = req.params.id;
    const { course_name, course_description } = req.body;
    const sql = 'UPDATE course SET course_name = ?, course_description = ? WHERE course_id = ?';
  
    connection.query(sql, [course_name, course_description, courseId], (err) => {
      if (err) {
        console.error('Error updating the course:', err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
      res.json({ message: 'Course updated successfully' });
    });
  });

  router.delete('/delete/:id', (req, res) => {
    const courseId = req.params.id;
    const sql = 'DELETE FROM course WHERE course_id = ?';
  
    connection.query(sql, [courseId], (err) => {
      if (err) {
        console.error('Error deleting the course:', err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
      res.json({ message: 'Course deleted successfully' });
    });
  });

  router.get('/search/:courseid', (req, res) => {
    const courseId = req.params.courseid; 
    const sql = 'SELECT * FROM course WHERE course_id = ?';
  
    connection.query(sql, [courseId], (err, results) => {
      if (err) {
        console.error('Error searching for the course:', err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
      if (results.length === 0) {
        res.status(404).json({ error: 'Course not found' });
      } else {
        // Course found
        res.json(results);
      }
    });
  });
  
  module.exports = router;