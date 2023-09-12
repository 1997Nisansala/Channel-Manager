export default async function handleUpdateStudent(studentId) {
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
  
      const response = await fetch(`http://localhost:8000/api/students/${studentId}`, {
        method: 'PUT', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(studentData),
      });
      if (response.ok) {
        return { success : true}
      } else {
        return { success : false}
      }
    } catch (error) {
      window.alert(error);
    }
  }
  