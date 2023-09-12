export default async function handleAddStudent() {
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
  
      const response = await fetch('http://localhost:8000/api/students', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(studentData),
      });
      if (response.ok) {
        window.alert('Student added successfully');
        return { success : true }
      } else {
        window.alert('Failed to add student');
        return { success : false }
      }
    } catch (error) {
      //window.alert('Failed to add student to the system');
      return { success : false}
    }
  }
  