import React from 'react';

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <a className="navbar-brand" href="#">โลโก้ของคุณ</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <a className="nav-link" href="#">หน้าแรก</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">เกี่ยวกับเรา</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">บริการ</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">ติดต่อเรา</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
