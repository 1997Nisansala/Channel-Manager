export default async function handleDeleteStudent(studentId) {
    try {
  
      const response = await fetch(`http://localhost:8000/api/students/${studentId}`, {
        method: 'DELETE', // Use DELETE method for deleting
      });
  
      if (response.ok) {
        return { success : true}
      } else {
        return { success : false}
      }
    } catch (error) {
      return { success : false}
    }
  }
  