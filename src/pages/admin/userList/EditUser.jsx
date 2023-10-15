import React from 'react';
import { Form, Input, Button, Card, Select } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import API from '../../../lib/api';
import Swal from 'sweetalert2';

function EditUser() {
  const [form] = Form.useForm();
  const params = useParams();
  const navigate = useNavigate();
  const [disabled, setDisabled] = useState(true);

  const [profileUser, setProfileUser] = useState({
    name: '',
    email: '',
    tel: '',
    level: '',
  });


  const getData = (id) => {
    API.get(`api-admin/user/${id}`)
      .then((response) => {
        const { name, email, tel, level } = response.data;
        setProfileUser({ name, email, tel, level });
        form.setFieldsValue({ name, email, tel, level });
      })
      .catch((error) => {
        console.error('เกิดข้อผิดพลาดในการดึงข้อมูลโปรไฟล์:', error);
      });
  }

  useEffect(() => {
    if (params.id) {
      getData(params.id)
    }
  }, [params.id]);

  const handleUpdateUser = () => {
    const values = form.getFieldsValue();
    API.put(`api-admin/users-update/${params.id}`, values)
      .then((response) => {
        Swal.fire({
          icon: 'success',
          title: 'การแก้ไขสำเร็จ',
          text: 'ข้อมูลผู้ใช้ถูกแก้ไขเรียบร้อยแล้ว',
        }).then(() => {
          navigate('/usermanage');
        });
      })
      .catch((error) => {
        console.error('เกิดข้อผิดพลาดในการอัพเดตข้อมูลผู้ใช้งาน:', error);
      });
  }

  return (
    <Card>
      <h2>แก้ไขผู้ใช้งาน</h2>
      <Form
        name="editUserForm"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 16 }}
        form={form}
      >
        <Form.Item
          label="ชื่อผู้ใช้"
          name="name"
          rules={[{ required: true, message: 'กรุณากรอกชื่อผู้ใช้' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="อีเมล"
          name="email"
          rules={[
            { required: true, message: 'กรุณากรอกอีเมล' },
            { type: 'email', message: 'รูปแบบอีเมลไม่ถูกต้อง' },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="เบอร์โทร"
          name="tel"
          rules={[{ required: true, message: 'กรุณากรอกเบอร์โทร' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="สถานะการเข้าถึง"
          name="level"
          rules={[{ required: true, message: 'กรุณาเลือกสถานะการเข้าถึง' }]}
        >
          <Select>
            <Option value="admin">admin</Option>
            <Option value="user">user</Option>
          </Select>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
          <Button type="primary" htmlType="button" onClick={handleUpdateUser}>
            แก้ไขข้อมูล
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}

export default EditUser;
