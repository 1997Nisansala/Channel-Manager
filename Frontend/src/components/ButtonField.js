import React from 'react';

function ButtonField({ type, label, onClick }) {
  return (
    <div className="col-2">
      <div className="form-group">
        <button
          type={type}
          className="btn btn-primary btn-md btn-block"
          onClick={onClick}
        >
          <span>{label}</span>
        </button>
      </div>
    </div>
  );
}

export default ButtonField;
