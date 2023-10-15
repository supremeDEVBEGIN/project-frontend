import React from 'react';
import { Form, Input, Button, Card,Select} from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import API from '../../../lib/api';
import Swal from 'sweetalert2';
import axios from 'axios';


function EditBooking() {
  const [form] = Form.useForm();
  const params = useParams();
  const navigate = useNavigate();

  const [profileBooking, setProfileBooking] = useState({
    table: '',
    customer: '',
    tel: '',
    date:'',
    count: '',
    status: '',

  });

  const getData = (id) => {
    API.get(`api/booking/${id}`)
      .then((response) => {
        const { table, customer, tel,date, count, status } = response.data;
        setProfileBooking({ table, customer, tel,date, count, status });
        form.setFieldsValue({ table, customer, tel,date, count, status });
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
    API.put(`api/booking/${params.id}`, values)
      .then((response) => {
        Swal.fire({
          icon: 'success',
          title: 'การแก้ไขสำเร็จ',
          text: 'ข้อมูลผู้ใช้ถูกแก้ไขเรียบร้อยแล้ว',
        }).then(() => {
          navigate('/bookinglist');
        });
      })
      .catch((error) => {
        console.error('เกิดข้อผิดพลาดในการอัพเดตข้อมูลผู้ใช้งาน:', error);
      });
  }


  return (
    <Card>
      <h2>แก้ไขการจอง</h2>
      <Form
        name="editBookingForm"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 16 }}
        form={form}
      >
        {/* ฟิลด์ชื่อผู้ใช้ */}
        <Form.Item
          label="โต๊ะ"
          name="table"
          rules={[{ required: true, message: 'กรุณากรอกชื่อผู้ใช้' }]}
        >
          <Input />
        </Form.Item>

        {/* ฟิลด์อีเมล */}
        <Form.Item
          label="ชื่อผู้จอง"
          name="customer"
          rules={[
            { required: true, message: 'กรุณากรอกอีเมล' },
            { type: 'email', message: 'รูปแบบอีเมลไม่ถูกต้อง' },
          ]}
        >
          <Input />
        </Form.Item>

        {/* ฟิลด์เบอร์โทร */}
        <Form.Item
          label="เบอร์โทร"
          name="tel"
          rules={[{ required: true, message: 'กรุณากรอกเบอร์โทร' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="วันที่จอง"
          name="date"
          rules={[{ required: true, message: 'กรุณากรอกเบอร์โทร' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="จำนวนคน"
          name="count"
          rules={[{ required: true, message: 'กรุณากรอกเบอร์โทร' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="สถานะการจอง"
          name="status"
          rules={[{ required: true, message: 'กรุณากรอกสถานะจอง' }]}
        >
          <Select>
            <Option value="รอการยืนยัน">รอการยืนยัน</Option>
            <Option value="ยืนยันการจอง">ยืนยันการจอง</Option>
          </Select>
        </Form.Item>

        {/* ปุ่มสำหรับการบันทึกการแก้ไข */}
        <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
          <Button type="primary" htmlType="button" onClick={handleUpdateUser}>
            แก้ไขข้อมูล
          </Button>
        </Form.Item>
      </Form>
    </Card>
  )
}

export default EditBooking