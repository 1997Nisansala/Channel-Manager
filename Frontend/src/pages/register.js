import React, { useState, useEffect } from 'react';
import InputField from '../components/InputFields';
import CourseInputField from '../components/CourseInputField';
import ButtonField from '../components/ButtonField';
import addStudent from '../functions/addStudent';
import searchStudent from '../functions/searchStudent';
import updateStudent from '../functions/updateStudent';
import deleteStudent from '../functions/deleteStudent';
import Navbar from '../components/navbar';

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
    fetch('http://localhost:8000/api/courses')
      .then((response) => response.json())
      .then((data) => {
        setCourses(data); // Store the course data in state
      })
      .catch((error) => {
        console.error('Error fetching courses:', error);
      });
  }, []);

  const handleAddStudent = async () => {
    const result = await addStudent(formData);
    if (result.success) {
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
    } 
  };

  const handleSearchStudent = async () => {
    
    const studentId = document.getElementById('studentid').value;
    const result = await searchStudent(studentId);
  
    if (result.success) {
      const studentData = result.data;
  
      // Update all form fields with the retrieved student data
      setFormData((prevData) => ({
        ...prevData,
        studentid: studentData.studentid || '',
        firstName: studentData.firstName || '',
        lastName: studentData.lastName || '',
        email: studentData.email || '',
        address: studentData.address || '',
        course1: studentData.course_id1 || '',
        course2: studentData.course_id2 || '',
        course3: studentData.course_id3 || '',
      }));
    }
    else{
      window.alert('Student not found');
    }
  };
  

  const handleUpdateStudent = async () => {
    const studentId = document.getElementById('studentid').value;

    const result = await updateStudent(studentId);

    if (result.success) {

      window.alert('Student updated successfully');

    } else {
      window.alert('Failed to update student');
    }
  };

  const handleDeleteStudent = async () => {
    const studentId = document.getElementById('studentid').value;

    const confirmDelete = window.confirm('Are you sure you want to delete this student?');

    if (!confirmDelete) {
      return; 
    }

    const result = await deleteStudent(studentId);

    if (result.success) {

      window.alert('Student deleted successfully');

      document.getElementById('studentid').value = '';
      document.getElementById('firstName').value = '';
      document.getElementById('lastName').value = '';
      document.getElementById('email').value = '';
      document.getElementById('address').value = '';
      document.getElementById('course1').value = '';
      document.getElementById('course2').value = '';
      document.getElementById('course3').value = '';

    } else {
      window.alert('Failed to delete student');
    }
  };

  return (
    <div>
      <Navbar/>
    <div className="container mt-5">
      <div className='row'>
      <div className="col-md-6">
      <form>
        <InputField
          type="text"
          id="studentid"
          name="studentid"
          label="Student ID"
          value={formData.studentid}
          onChange={(e) => {
            const newValue = e.target.value;
            setFormData((prevData) => ({
              ...prevData,
              studentid: newValue,
            }));
          }}
          required
        />
        <InputField
          type="text"
          id="firstName"
          name="firstName"
          label="First Name"
          value={formData.firstName}
          onChange={(e) => {
            const newValue = e.target.value;
            setFormData((prevData) => ({
              ...prevData,
              firstName: newValue,
            }));
          }}
          required
        />

        <InputField
          type="text"
          id="lastName"
          name="lastName"
          label="Last Name"
          value={formData.lastName}
          onChange={(e) => {
            const newValue = e.target.value;
            setFormData((prevData) => ({
              ...prevData,
              lastName: newValue,
            }));
          }}
          required
        />

        <InputField
          type="email"
          id="email"
          name="email"
          label="Email"
          value={formData.email}
          onChange={(e) => {
            const newValue = e.target.value;
            setFormData((prevData) => ({
              ...prevData,
              email: newValue,
            }));
          }}
          required
        />

        <InputField
          type="text"
          id="address"
          name="address"
          label="Address"
          value={formData.address}
          onChange={(e) => {
            const newValue = e.target.value;
            setFormData((prevData) => ({
              ...prevData,
              address: newValue,
            }));
          }}
          required
        />

        <CourseInputField
          id="course1"
          name="course1"
          label="Course 1"
          value={formData.course1}
          courses={courses}
          onChange={(e) => {
            const newValue = e.target.value;
            setFormData((prevData) => ({
              ...prevData,
              course1: newValue,
            }));
          }}
          required
        />

        <CourseInputField
          id="course2"
          name="course2"
          label="Course 2"
          value={formData.course2}
          courses={courses}
          onChange={(e) => {
            const newValue = e.target.value;
            setFormData((prevData) => ({
              ...prevData,
              course2: newValue,
            }));
          }}
          required
        />

        <CourseInputField
          id="course3"
          name="course3"
          label="Course 3"
          value={formData.course3}
          courses={courses}
          onChange={(e) => {
            const newValue = e.target.value;
            setFormData((prevData) => ({
              ...prevData,
              course3: newValue,
            }));
          }}
          required
        />
        <div><br></br>
        </div>
        <div className="row span2">
          <ButtonField type="submit" label="Insert" onClick={handleAddStudent} />
          <ButtonField type="submit" label="Update" onClick={handleUpdateStudent} />
          <ButtonField type="submit" label="Delete" onClick={handleDeleteStudent} />
          <ButtonField type="button" label="Search" onClick={handleSearchStudent} />
        </div>
      </form>
      </div>
      </div>
    </div>
    </div>
  );
}

export default Register;
