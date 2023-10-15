import{ useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../lib/api'
import Swal from 'sweetalert2'
import Navbar from '../components/Navbar';

function Register() {
  var initialRegister = {
    name: "",
    email: "",
    password: "",
    tel: "",
  };
  const navigate = useNavigate()
  const [register, setRegister] = useState(initialRegister); 

  const handleSubmit = (e) => { 
    e.preventDefault(); 
  
    API.post(`api/register`, {
      name: register.name,
      email: register.email,
      password: register.password,
      tel: register.tel,
    })
      .then((res) => {
        Swal.fire({
          title: 'ลงทะเบียนสำเร็จ',
          text: 'คุณได้ลงทะเบียนเรียบร้อยแล้ว',
          icon: 'success',
          confirmButtonText: 'ตกลง'
        }).then(() => {
          navigate("/login");
        });
      })
      .catch((error) => {
        Swal.fire({
          title: 'เกิดข้อผิดพลาด',
          text: 'เบอร์โทรศัพท์นี้ถูกใช้ไปแล้ว',
          icon: 'error',
          confirmButtonText: 'ตกลง'
        });
        console.log(error);
      });
  };

  return (
    <>
    <Navbar/>
    <div className="container mt-5">
      <h2>ลงทะเบียน</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">ชื่อผู้ใช้งาน</label>
          <input
            type="text"
            className="form-control"
            name="username"
            value={register.name} // เปลี่ยน userData.name เป็น register.name
            onChange={(e) => {
              setRegister({ ...register, name: e.target.value });
            }}
            placeholder="ชื่อผู้ใช้งาน"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">อีเมล</label>
          <input
            type="email"
            className="form-control"
            name="email"
            onChange={(e) => {
              setRegister({ ...register, email: e.target.value });
            }}
            placeholder="อีเมล"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">เบอร์โทรศัพท์</label>
          <input
            type="tel"
            className="form-control"
            name="phoneNumber"
            onChange={(e) => {
              setRegister({ ...register, tel: e.target.value });
            }}
            placeholder="เบอร์โทรศัพท์"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">รหัสผ่าน</label>
          <input
            type="password"
            className="form-control"
            name="password"
            onChange={(e) => {
              setRegister({ ...register, password: e.target.value });
            }}
            placeholder="รหัสผ่าน"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">ลงทะเบียน</button>
      </form>
    </div>
    </>
  );
}

export default Register;
