import React, { useState, useEffect } from 'react';

function Register() {
  const [formData, setFormData] = useState({
    studentid: '',
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    course1: '',
    course2: '',
    course3: '',
  });

  const [courses, setCourses] = useState([]); // State to store the course data

  // Fetch course data from the API when the component mounts
  useEffect(() => {
    fetch('http://localhost:3000/api/courses')
      .then((response) => response.json())
      .then((data) => {
        setCourses(data); // Store the course data in state
      })
      .catch((error) => {
        console.error('Error fetching courses:', error);
      });
  }, []); //

  const handleAddStudent = async () => {
    console.log('Before fetch request');
    console.log(formData);
    try {
      const studentData = {
        studentid: document.getElementById('studentid').value,
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        email: document.getElementById('email').value,
        address: document.getElementById('address').value,
        course_ids: [
          document.getElementById('course1').value,
          document.getElementById('course2').value,
          document.getElementById('course3').value,
        ],
      };
      
      const response = await fetch('http://localhost:3000/api/students', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(studentData),
      });

      if (response.ok) {
        // Student added successfully, you can show a success message or reset the form
        window.alert('Student added successfully');
        setFormData({
          studentid: '',
          firstName: '',
          lastName: '',
          email: '',
          address: '',
          course1: '',
          course2: '',
          course3: '',
        });
      } else {
        window.alert('Failed to add student');
      }
    } catch (error) {
      window.alert('Failed to add student to the system');
    }
  };

  const handleSearchStudent = async () => {
    // Get the student ID to search for
    const studentId = document.getElementById('studentid').value;
  
    try {
      const response = await fetch(`http://localhost:3000/api/students/${studentId}`);
  
      if (response.ok) {
        const studentData = await response.json();
  
        // Update all form fields with the retrieved student data
        setFormData({
          studentid: studentData.studentid || '',
          firstName: studentData.firstName || '',
          lastName: studentData.lastName || '',
          email: studentData.email || '',
          address: studentData.address || '',
          course1: studentData.course_id1 || '',
          course2: studentData.course_id2 || '',
          course3: studentData.course_id3 || '',
        });
      } else {
        window.alert('Student not found');
      }
    } catch (error) {
      window.alert('Failed to search for student');
    }
  };
  
  const handleUpdateStudent = async () => {
    console.log('Before update request');
    console.log(formData);
    try {
      const studentData = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        email: document.getElementById('email').value,
        address: document.getElementById('address').value,
        course_ids: [
          document.getElementById('course1').value,
          document.getElementById('course2').value,
          document.getElementById('course3').value,
        ],
      };
      
      const studentid = document.getElementById('studentid').value;
  
      const response = await fetch(`http://localhost:3000/api/students/${studentid}`, {
        method: 'PUT', // Use PUT for updating
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(studentData),
      });
  
      if (response.ok) {
        // Student updated successfully, you can show a success message or reset the form
        window.alert('Student updated successfully');
        // Clear form or perform any necessary UI updates
      } else {
        window.alert('Failed to update student');
      }
    } catch (error) {
      window.alert('Failed to update student in the system');
    }
  };
  
  const handleDeleteStudent = async () => {
    try {
      const studentid = document.getElementById('studentid').value;
  
      // Display a confirmation dialog before deleting the student
      const confirmDelete = window.confirm('Are you sure you want to delete this student?');
  
      if (!confirmDelete) {
        return; // User canceled the deletion
      }
  
      const response = await fetch(`http://localhost:3000/api/students/${studentid}`, {
        method: 'DELETE', // Use DELETE method for deleting
      });
  
      if (response.ok) {
        // Student deleted successfully, you can show a success message or perform any necessary UI updates
        window.alert('Student deleted successfully');

        // Clear the input fields
        document.getElementById('studentid').value = '';
        document.getElementById('firstName').value = '';
        document.getElementById('lastName').value = '';
        document.getElementById('email').value = '';
        document.getElementById('address').value = '';
        document.getElementById('course1').value = '';
        document.getElementById('course2').value = '';
        document.getElementById('course3').value = '';
        // Clear form or perform any necessary UI updates
      } else {
        window.alert('Failed to delete student');
      }
    } catch (error) {
      window.alert('Failed to delete student in the system');
    }
  };
  

  return (
    <div className="container mt-5">
      <h2>Student Details</h2>
      <form>
      <div className="row">
          <div className="col-1">
            <div className="form-group mb-2">
              <label htmlFor="studentid">Student ID:</label>
            </div>
          </div>
          <div className="col-4">
            <div className="form-group mb-2">
              <input
                type="text"
                className="form-control"
                id="studentid"
                name="studentid"
                required
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-1">
            <div className="form-group mb-2">
              <label htmlFor="firstName">First Name:</label>
            </div>
          </div>
          <div className="col-4">
            <div className="form-group mb-2">
              <input
                type="text"
                className="form-control"
                id="firstName"
                name="firstName"
                required
                value={formData.firstName}
                 onChange={(e) => {
                const newValue = e.target.value;
                setFormData((prevData) => ({
                ...prevData,
                  firstName: newValue,
                }));
                }}
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-1">
            <div className="form-group mb-2">
              <label htmlFor="lastName">Last Name:</label>
            </div>
          </div>
          <div className="col-4">
            <div className="form-group mb-2">
              <input
                type="text"
                className="form-control"
                id="lastName"
                name="lastName"
                required
                value={formData.lastName}
                 onChange={(e) => {
                const newValue = e.target.value;
                setFormData((prevData) => ({
                ...prevData,
                  lastName : newValue,
                }));
                }}
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-1">
            <div className="form-group mb-2">
              <label htmlFor="email">Email:</label>
            </div>
          </div>
          <div className="col-4">
            <div className="form-group mb-2">
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                required
                value={formData.email}
                 onChange={(e) => {
                const newValue = e.target.value;
                setFormData((prevData) => ({
                ...prevData,
                  email : newValue,
                }));
                }}
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-1">
            <div className="form-group mb-2">
              <label htmlFor="address">Address:</label>
            </div>
          </div>
          <div className="col-4">
            <div className="form-group mb-2">
              <input
                type="text"
                className="form-control"
                id="address"
                name="address"
                required
                value={formData.address}
                 onChange={(e) => {
                const newValue = e.target.value;
                setFormData((prevData) => ({
                ...prevData,
                  address : newValue,
                }));
                }}
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-1">
            <div className="form-group mb-2">
              <label htmlFor="course1">Course 1:</label>
            </div>
          </div>
          <div className="col-4">
            <div className="form-group mb-2">
              <select
                className="form-control"
                id="course1"
                name="course1"
                required
                value={formData.course1} // Set the selected value based on form data
                onChange={(e) => {
                  const newValue = e.target.value;
                  setFormData((prevData) => ({
                    ...prevData,
                    course1: newValue,
                  }));
                }}
              >
                <option value="">Select a course</option>
                {courses.map((course) => (
                  <option key={course.course_id} value={course.course_id}>
                    {course.course_name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-1">
            <div className="form-group mb-2">
              <label htmlFor="course1">Course 2:</label>
            </div>
          </div>
          <div className="col-4">
            <div className="form-group mb-2">
              <select
                className="form-control"
                id="course2"
                name="course2"
                required
                value={formData.course2} // Set the selected value based on form data
                onChange={(e) => {
                  const newValue = e.target.value;
                  setFormData((prevData) => ({
                    ...prevData,
                    course2: newValue,
                  }));
                }}
              >
                <option value="">Select a course</option>
                {courses.map((course) => (
                  <option key={course.course_id} value={course.course_id}>
                    {course.course_name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-1">
            <div className="form-group mb-2">
              <label htmlFor="course1">Course 1:</label>
            </div>
          </div>
          <div className="col-4">
            <div className="form-group mb-2">
              <select
                className="form-control"
                id="course3"
                name="course3"
                required
                value={formData.course3} // Set the selected value based on form data
                onChange={(e) => {
                  const newValue = e.target.value;
                  setFormData((prevData) => ({
                    ...prevData,
                    course3: newValue,
                  }));
                }}
              >
                <option value="">Select a course</option>
                {courses.map((course) => (
                  <option key={course.course_id} value={course.course_id}>
                    {course.course_name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="row span2">
          <div className="col-1">
            <div className="form-group">
            <button
                type="submit"
                className="btn btn-primary btn-md btn-block"
                onClick={handleAddStudent}
              > <span>Add</span></button>
            </div>
          </div>

          <div className="col-1">
            <div className="form-group">
              <button type="submit" className="btn btn-primary btn-md btn-block" onClick={handleUpdateStudent}>Update</button>
            </div>
          </div>

          <div className="col-1">
            <div className="form-group">
              <button type="submit" className="btn btn-primary btn-md btn-block" onClick={handleDeleteStudent}>Delete</button>
            </div>
          </div>

          <div className="col-1">
            <div className="form-group">
              <button type="button" className="btn btn-primary btn-md btn-block" onClick={handleSearchStudent}>Search</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Register;
