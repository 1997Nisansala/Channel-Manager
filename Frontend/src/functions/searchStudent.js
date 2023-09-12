export default async function handleSearchStudent(studentId) {
  try {
    const response = await fetch(`http://localhost:8000/api/students/${studentId}`);

    if (response.ok) {
      const studentData = await response.json();
      return {
        success: true,
        data: studentData,
      };
    } else {
      return {
        success: false,
        error: 'Student not found',
      };
    }
  } catch (error) {
    return {
      success: false,
      error: 'Failed to search for student',
    };
  }
}
