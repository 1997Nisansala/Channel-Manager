export default async function handleInsert(formData) {
    try {
        const courseData = {
            course_id: document.getElementById('courseid').value,
            course_name: document.getElementById('course').value,
            course_description: document.getElementById('description').value
          };
      const response = await fetch('http://localhost:8000/api/courses/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(courseData),
      });
  
      if (response.ok) {
        window.alert('Course added successfully');
        const { message, courseId } = await response.json();
        return { success: true, message, courseId };
      } else {
        window.alert('Failed to add course');
        const error = `Unexpected response status: ${response.status}`;
        return { success: false, error };
      }
    } catch (error) {
        window.alert('Failed to add course');
      return { success: false, error: 'Error adding a course: ' + error.message };
    }
  }
  