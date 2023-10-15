import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../lib/api';
import Swal from 'sweetalert2';
import Navbar from '../components/Navbar';
import liff from '@line/liff';


const initialLogin = {
  name: '',
  password: '',
};

function Login() {
  const navigate = useNavigate();

  const [login, setLogin] = useState(initialLogin);

  const loginWeb = async (e) => {
    e.preventDefault();
    console.log(e);

    if (login.name === '' || login.password === '') {
      alert('กรุณากรอกข้อมูล');
    } else {
      try {
        const res = await API.post(`api/login`, {
          name: login.name,
          password: login.password,
        });

        console.log(res.data);

        Swal.fire({
          icon: 'success',
          title: 'เข้าสู่ระบบสำเร็จ',
          showConfirmButton: false,
          timer: 1500,
        });

        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', res.data.user);
        localStorage.setItem('email', res.data.email);
        localStorage.setItem('tel', res.data.tel);
        localStorage.setItem('level', res.data.level);
        localStorage.setItem('line', res.data.line);

        if (res.data.level === 'user') {
          navigate('/home');
        } else if (res.data.level === 'admin') {
          navigate('/dashboard');
        }
      } catch (error) {
        if (error.response && error.response.status === 403) {
          Swal.fire({
            icon: 'error',
            title: 'ไม่พอข้อมูลผู้ใช้',
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'รหัสผ่านไม่ถูกต้อง',
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    }
  };

  useEffect(() => {
    liff.init({ liffId: '2000508817-Gm9roeQZ' })
  }, [])

  const handleLogin = async () => {
    try {
      liff.login();
        console.log('ข้อมูลผู้ใช้ LINE:', lineProfile);
    } catch (err) {
      console.log(err);
    }
  };



  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <h2>เข้าสู่ระบบ</h2>
        <form>
          <div className="mb-3">
            <label className="form-label">ชื่อผู้ใช้งาน</label>
            <input
              type="text"
              className="form-control"
              placeholder="ชื่อผู้ใช้งาน"
              value={login.name}
              onChange={(e) => {
                setLogin({ ...login, name: e.target.value });
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              รหัสผ่าน
            </label>
            <input
              type="password"
              className="form-control"
              placeholder="กรอกรหัสผ่าน"
              value={login.password}
              onChange={(e) => {
                setLogin({ ...login, password: e.target.value });
              }}
            />
          </div>
          <div>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={(e) => loginWeb(e)}
            >
              เข้าสู่ระบบ
            </button>
          </div>
        </form>
        <div>
          <button type="button" className="btn btn-success mt-3" onClick={handleLogin} >
            Login with Line
          </button>
        </div>
      </div>
    </>
  );
}

export default Login;
