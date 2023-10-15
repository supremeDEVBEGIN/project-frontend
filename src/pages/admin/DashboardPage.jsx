import React from 'react';
import { Card, Layout, Menu } from 'antd';
import {
  HomeOutlined,
  UserOutlined,
  FileOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; // เพิ่มการนำเข้า SweetAlert2

const { Sider, Content, Header } = Layout;

function DashboardPage({ children }) {
  const navigate = useNavigate()

  const handleLogout = () => {
    Swal.fire({
      title: 'คุณต้องการออกจากระบบหรือไม่?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ใช่, ออกจากระบบ',
      cancelButtonText: 'ยกเลิก',
    }).then((result) => {
      if (result.isConfirmed) {
        // หากผู้ใช้กดยืนยัน ให้ลบข้อมูลใน Local Storage
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('email');
        localStorage.removeItem('tel');
        localStorage.removeItem('level');

        // นำผู้ใช้กลับไปหน้าล็อกอิน
        navigate('/login');
      }
    });
  }

  // ตรวจสอบสถานะการล็อกอิน
  const isLoggedIn = Boolean(localStorage.getItem('token'));

  if (!isLoggedIn) {
    navigate('/login');
    return null;
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ background: '#001529', padding: '0 16px', color: 'white' }}>
        <h1>resbook</h1>
      </Header>
      <Layout>
        <Sider width={200} theme="dark" >
          <Menu mode="vertical" theme="dark" defaultSelectedKeys={['1']}>
            <Menu.Item key="/dashboard" icon={<HomeOutlined />} onClick={() => navigate('/dashboard')}>
              Dashboard
            </Menu.Item>

            <Menu.Item key="/usermanage" icon={<UserOutlined />} onClick={() => navigate('/usermanage')}>
              ผู้ใช้งาน
            </Menu.Item>

            <Menu.Item key="/bookinglist" icon={<FileOutlined />} onClick={() => navigate('/bookinglist')}>
              การจองโต๊ะ
            </Menu.Item>

            <Menu.Item style={{color: 'red'}} key="/logout" icon={<LogoutOutlined />} onClick={handleLogout}>
              ออกจากระบบ
            </Menu.Item>

          </Menu>
        </Sider>
        <Layout>
          <Content >
            {children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}

export default DashboardPage;
