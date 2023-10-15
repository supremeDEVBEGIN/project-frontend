import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import './nav.css'

function Navbar() {
  const navigate = useNavigate();
  const user = localStorage.getItem('user');
  const token = localStorage.getItem('token');
  const tel = localStorage.getItem("tel");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);


  const logout = () => {
    Swal.fire({
      title: 'คุณแน่ใจหรือไม่?',
      text: 'คุณต้องการออกจากระบบใช่หรือไม่?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'ยืนยัน',
      cancelButtonText: 'ยกเลิก',
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear();
        navigate('/login');
        window.location.reload();
      }
    });
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark " >
      <div className="container">
        <div>
          <Link className="navbar-brand" to={'/home'}>
            <span>Resbook</span>
          </Link>
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
          style={{ marginLeft: 'auto' }}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <div>
            <Link className="navbar-brand" to={'/home'}>
              หน้าหลัก
            </Link>
          </div>
          <div>
          {!token && (
            <Link className="navbar-brand" to={'/showtable'}>
              แผนผังที่นั่ง
            </Link>
            )}
          </div>
          <div>
            {token && (
              <Link className="navbar-brand" to={'/booking'}>
                จองโต๊ะ
              </Link>
            )}
          </div>
          <div className="navbar-nav ms-auto">
            {token ? (
              <div className={`dropdown ${isDropdownOpen ? 'show' : ''}`}>
                <button
                  className="btn btn-dark border-0 dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton"
                  data-bs-toggle="dropdown"
                  aria-expanded={isDropdownOpen}
                  onClick={toggleDropdown}
                >
                  {user}
                </button>
                <ul className={`dropdown-menu ${isDropdownOpen ? 'show' : ''} bg-dark border-0`}>
                  <li>
                    <Link className="dropdown-item text-white" to={`/profile/${user}`}>
                      โปรไฟล์
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <Link className="dropdown-item text-white" to={`/history/${user}`}>
                      ประวัติการจอง
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <button
                      className="dropdown-item text-white"
                      onClick={() => logout()}
                    >
                      ออกจากระบบ
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <>
                <Link className="nav-link" to={'/register'}>
                  สมัครสมาชิก
                </Link>
                <Link className="nav-link" to={'/login'}>
                  เข้าสู่ระบบ
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
