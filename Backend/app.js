const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Create an instance of an Express router
const router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Import route modules
const studentsRoutes = require('./api/student');
const coursesRoutes = require('./api/course');

// Use route modules
app.use('/api/students', studentsRoutes);
app.use('/api/courses', coursesRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
