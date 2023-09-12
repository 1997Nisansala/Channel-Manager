import React from 'react';

function CourseInputField({ id, name, label, value, courses, onChange, required }) {
  return (
    <div className="row">
      <div className="col-3">
        <div className="form-group mb-2">
          <label htmlFor={id}>{label}:</label>
        </div>
      </div>
      <div className="col-6">
        <div className="form-group mb-2">
          <select
            className="form-control"
            id={id}
            name={name}
            required={required}
            value={value}
            onChange={onChange}
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
  );
}

export default CourseInputField;
