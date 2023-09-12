import React from 'react';

function InputField({ type, id, name, label, value, onChange, required }) {
  return (
    <div className="row">
      <div className="col-3">
        <div className="form-group mb-2">
          <label htmlFor={id}>{label}:</label>
        </div>
      </div>
      <div className="col-6">
        <div className="form-group mb-2">
          <input
            type={type}
            className="form-control"
            id={id}
            name={name}
            required={required}
            value={value}
            onChange={onChange}
          />
        </div>
      </div>
    </div>
  );
}

export default InputField;
