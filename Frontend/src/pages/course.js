import React, { useState } from 'react';
import InputField from '../components/InputFields';
import ButtonField from '../components/ButtonField';
import Navbar from '../components/navbar';
import handleInsert from '../functions/addcourse';

function Course() {
  const [formData, setFormData] = useState({
    course_id: '',
    course_name: '',
    course_description: '',
  });

  const handleaddcourse = async () => {
    const result = await handleInsert(formData);
    if (result.success) { 
      setFormData({
        course_id: '',
        course_name: '',
        course_description: '',
      });
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
          id="courseid"
          name="courseid"
          label="Course ID"
          value={formData.course_id}
          onChange={(e) => {
            const newValue = e.target.value;
            setFormData((prevData) => ({
              ...prevData,
              course_id: newValue,
            }));
          }}
          required
        />
        <InputField
          type="text"
          id="course"
          name="course"
          label="Course"
          value={formData.course_name}
          onChange={(e) => {
            const newValue = e.target.value;
            setFormData((prevData) => ({
              ...prevData,
              course_name: newValue,
            }));
          }}
          required
        />

        <InputField
          type="text"
          id="description"
          name="description"
          label="Description"
          value={formData.course_description}
          onChange={(e) => {
            const newValue = e.target.value;
            setFormData((prevData) => ({
              ...prevData,
              course_description: newValue,
            }));
          }}
          required
        />
        <div><br></br></div>
        <div className="row span2">
          <ButtonField type="button" label="Insert" onClick={handleaddcourse} />
        </div>
      </form>
    </div>
  </div>
</div>

    </div>
  );
}

export default Course;
