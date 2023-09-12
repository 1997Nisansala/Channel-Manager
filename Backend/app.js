const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 8000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Allow requests from specific origins
app.use(cors({
  origin: 'http://localhost:3000', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
}));
// Import route modules
const studentsRoutes = require('./api/student');
const coursesRoutes = require('./api/course');

// Use route modules
app.use('/api/students', studentsRoutes);
app.use('/api/course', coursesRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
