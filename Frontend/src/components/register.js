import React, { useState } from 'react';

function Register() {
    const [formData, setFormData] = useState({
      studentid: '',
      firstName: 'test',
      lastName: '',
      email: '',
      address: '',
      course: '',
    });
  
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
            course: document.getElementById('course').value,
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
          console.log('Student added successfully');
          setFormData({
            studentid: formData.studentid,
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            address: formData.address,
            course: formData.course,
          });
        } else {
          // Handle errors here, show an error message, etc.
          console.error('Failed to add student');
        }
      } catch (error) {
        console.error('Error adding student:', error);
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
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-1">
            <div className="form-group mb-2">
              <label htmlFor="course">Course:</label>
            </div>
          </div>
          <div className="col-4">
            <div className="form-group mb-2">
              <select
                className="form-control"
                id="course"
                name="course"
                required
              >
                <option value="">Select a course</option>
                <option value="course1">Course 1</option>
                <option value="course2">Course 2</option>
                <option value="course3">Course 3</option>
              </select>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-1">
            <div className="form-group">
            <button
                type="submit" // Use type="button" to prevent form submission
                className="btn btn-primary"
                onClick={handleAddStudent} // Call the function on button click
              >Add</button>
            </div>
          </div>

          <div className="col-1">
            <div className="form-group">
              <button type="submit" className="btn btn-primary">Update</button>
            </div>
          </div>

          <div className="col-1">
            <div className="form-group">
              <button type="submit" className="btn btn-primary">Delete</button>
            </div>
          </div>

          <div className="col-1">
            <div className="form-group">
              <button type="submit" className="btn btn-primary">Search</button>
            </div>
          </div>

        </div>
      </form>
    </div>
  );
}

export default Register;
