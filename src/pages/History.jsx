import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import API from '../lib/api';
import { useParams } from 'react-router-dom';
import { Card } from 'antd';
import Swal from 'sweetalert2';

function History() {
    const params = useParams();
    const [history, setHistory] = useState([]);

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = () => {
        API.get(`api/history/${params.id}`)
            .then((response) => {
                console.log(response.data);
                const userData = response.data;
                setHistory(userData);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    const cancelBooking = (key) => {
        Swal.fire({
          title: 'ยืนยันการยกเลิกการจอง',
          text: 'คุณต้องการยกเลิกการจองนี้หรือไม่?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'ใช่, ยกเลิก',
          cancelButtonText: 'ยกเลิก'
        }).then((result) => {
            if (result.isConfirmed) {
                API.delete(`api/history/${key}`)
                    .then((response) => {
                        console.log(response.data);
                        loadUsers();
                        Swal.fire('ยกเลิกการจองเรียบร้อย', '', 'success');
                    })
                    .catch((error) => {
                        console.error(error);
                        Swal.fire('เกิดข้อผิดพลาดในการยกเลิก', '', 'error');
                    });
            }
        });
    }

    return (
        <>
            <Navbar />
            <div className="container mt-5">
                <h1>ประวัติการจอง</h1>
                {history.map((reservation) => (
                    <Card
                        style={{
                            fontSize: '16px',
                            marginBottom: '20px',
                            backgroundColor: 'rgb(0 0 0 / 38%)',
                            border: '1px solid rgb(255 255 255)',
                            color: 'white',
                            display: 'flex',
                            flexDirection: 'column', // แสดงเป็นคอลัมน์
                            alignItems: 'flex-start', // จัดให้ปุ่มอยู่ด้านบน
                        }}
                    >
                        <h4>โต๊ะ: {reservation.table}</h4>
                        <p>ชื่อผู้จอง: {reservation.customer}</p>
                        <p>เบอร์โทร: {reservation.tel}</p>
                        <p>วันที่จอง: {reservation.date}</p>
                        <p>จำนวนคน: {reservation.count}</p>
                        <p>
                            สถานะ:{' '}
                            <span className={`badge ${reservation.status === 'รอการยืนยัน' ? 'bg-primary' : 'bg-success'}`}>
                                {reservation.status}
                            </span>
                        </p>
                        <button type="button" class="btn btn-warning" onClick={() => cancelBooking(reservation._id)} >
                            ยกเลิกการจอง
                        </button>
                    </Card>
                ))}
            </div>
        </>
    );
}

export default History;
