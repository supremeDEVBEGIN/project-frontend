import React, { useEffect, useState } from 'react';
import { Card, Button, Col, Row, Select } from 'antd';
import API from '../../../lib/api';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function UserManage() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const [selectedStatus, setSelectedStatus] = useState("ทั้งหมด");

  const adduserclick = () => {
    navigate('/adduser');
  };

  const edituserclick = (userId) => {
    navigate(`/edituser/${userId}`);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = () => {
    API.get('api-admin/users')
      .then((response) => {
        const userData = response.data;
        setUsers(userData);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const deleteUser = (userId) => {
    Swal.fire({
      title: 'ยืนยันการลบผู้ใช้งาน',
      text: 'คุณต้องการลบผู้ใช้งานนี้หรือไม่?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'ใช่, ลบ',
      cancelButtonText: 'ยกเลิก',
    }).then((result) => {
      if (result.isConfirmed) {
        API.delete(`api-admin/users-delete/${userId}`)
          .then((response) => {
            console.log(response.data);
            loadUsers();
            Swal.fire('ลบผู้ใช้งานเรียบร้อย', '', 'success');
          })
          .catch((error) => {
            console.error(error);
            Swal.fire('เกิดข้อผิดพลาดในการลบ', '', 'error');
          });
      }
    });
  };

  return (
    <Card title="ผู้ใช้งาน" style={{ margin: '10px' }}>
      <Select
        value={selectedStatus}
        style={{ width: 200, marginBottom: '10px' }}
        onChange={(value) => setSelectedStatus(value)}
      >
        <Select.Option value="ทั้งหมด">ทั้งหมด</Select.Option>
        <Select.Option value="admin">admin</Select.Option>
        <Select.Option value="user">user</Select.Option>
      </Select>
      <Button type="primary" style={{ margin: '10px' }} onClick={adduserclick}>
        เพิ่มผู้ใช้งาน
      </Button>
      <div>
        {users.length > 0 &&
          users.map((user) => {
            if (selectedStatus === "ทั้งหมด" || user.level === selectedStatus) {
              return (
                <Card key={user.id} style={{ marginBottom: '10px' }}>
                  <Row>
                    <Col span={12}>
                      <p><strong>เลขไอดี:</strong> {user._id}</p>
                      <p><strong>ชื่อผู้ใช้:</strong> {user.name}</p>
                      <p><strong>เบอร์โทร:</strong> {user.tel}</p>
                    </Col>
                    <Col span={12}>
                      <p><strong>อีเมล:</strong> {user.email}</p>
                      <p><strong>สถานะการเข้าถึง:</strong> {user.level}</p>
                      <p><strong>เพิ่มโดย:</strong> {user.addBy}</p>
                    </Col>
                  </Row>
                  <Button style={{ margin: '10px' }} onClick={() => edituserclick(user._id)}>
                    แก้ไขข้อมูล
                  </Button>
                  <Button style={{ margin: '10px' }} onClick={() => deleteUser(user._id)}>
                    ลบข้อมูล
                  </Button>
                </Card>
              );
            }
            return null;
          })}
      </div>
    </Card>
  );
}

export default UserManage;
