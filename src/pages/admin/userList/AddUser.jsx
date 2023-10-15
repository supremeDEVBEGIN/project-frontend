import React, { useState } from 'react';
import { Form, Input, Button, Card } from 'antd';
import API from '../../../lib/api';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function AddUser() {
    var initialUser = {
        name: "",
        email: "",
        password: "",
        tel: "",
    }
    const navigate = useNavigate()
    const [user, setUser] = useState(initialUser);

    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log(e,'test');
        API.post(`api-admin/admin-create`, {
            name: user.name,
            email: user.email,
            password: user.password,
            tel: user.tel,
          })
          .then((res) => {
            Swal.fire({
              title: 'ลงทะเบียนสำเร็จ',
              text: 'คุณได้ลงทะเบียนเรียบร้อยแล้ว',
              icon: 'success',
              confirmButtonText: 'ตกลง'
            }).then(() => {
              navigate("/usermanage");
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
    }


    return (
        <Card>
            <h2>เพิ่มผู้ใช้งาน</h2>
            <Form
                name="addUserForm"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 16 }}
                onSubmit={handleSubmit}
            >
                <Form.Item
                    label="ชื่อผู้ใช้"
                    name="name"
                    rules={[{ required: true, message: 'กรุณากรอกชื่อผู้ใช้' }]}
                >
                    <Input onChange={(e) => {
              setUser({ ...user, name: e.target.value });
            }} />
                </Form.Item>

                <Form.Item
                    label="อีเมล"
                    name="email"
                    rules={[
                        { required: true, message: 'กรุณากรอกอีเมล' },
                        { type: 'email', message: 'รูปแบบอีเมลไม่ถูกต้อง' },
                    ]}
                >
                    <Input onChange={(e) => {
              setUser({ ...user, email: e.target.value });
            }}/>
                </Form.Item>

                <Form.Item
                    label="รหัสผ่าน"
                    name="password"
                    rules={[{ required: true, message: 'กรุณากรอกรหัสผ่าน' }]}
                >
                    <Input onChange={(e) => {
              setUser({ ...user, password: e.target.value });
            }}/>
                </Form.Item>

                <Form.Item
                    label="เบอร์โทร"
                    name="phoneNumber"
                    rules={[{ required: true, message: 'กรุณากรอกเบอร์โทร' }]}
                >
                    <Input onChange={(e) => {
              setUser({ ...user, tel: e.target.value });
            }}/>
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
                    <Button type="primary" htmlType="submit" onClick={handleSubmit}>
                        เพิ่มผู้ใช้งาน
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
}

export default AddUser;
