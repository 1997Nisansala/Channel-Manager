import React from 'react';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item active">
            <a
              className="nav-link"
              href="/"
              style= {{ color: 'white' }} 
            >
              Student Registration
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              href="/course"
              style={{ color: 'white' }}
            >
              Course Registration
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
