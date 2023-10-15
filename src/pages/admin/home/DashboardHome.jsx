import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Column, Line } from '@ant-design/plots';
import { Card, Col, Row, Table } from 'antd';
import API from '../../../lib/api'


function DashboardHome() {
  const [data1, setData1] = useState([])
  const [data2, setData2] = useState()
  const [data3, setData3] = useState()
  const [bookings, setBookings] = useState([])

  const bookinglist = async () => {
    API.get("/api/booking").then((res) => {
      console.log(res.data);
      const sortedBookings = res.data.sort((a, b) => new Date(a.date) - new Date(b.date));
      setBookings(sortedBookings);
    });
  };

  useEffect(() => {
    bookinglist();
  }, []);

  const getdata1 = () => {
    API.get('/dashboard').then(
      res => {
        // res.data.map(r => {
        //   console.log(r);
        //   setData1((e) => { return { ...e,time: r.time.toString(),count: r.time.toString() } })
        // })
        let { data } = res
        setData1(data)
      }
    )
  }



  const getdata2 = () => {
    API.get('/dashboardtoday').then(
      res => {
        setData2(res.data)
      }
    )
  }

  const getdata3 = () => {
    API.get('/dashboarduser').then(
      res => {
        setData3(res.data)
        console.log(res);
      }
    )
  }


  useEffect(() => {
    getdata1()
    getdata2()
    getdata3()
  }, [])


  const columns = [
    {
      title: 'ชื่อผู้จอง',
      dataIndex: 'customer',
      key: 'customer',
    },
    {
      title: 'โต๊ะ',
      dataIndex: 'table',
      key: 'table',
    },
    {
      title: 'เวลา',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'จำนวนคน',
      dataIndex: 'count',
      key: 'count',
    },
    {
      title: 'สถานะ',
      dataIndex: 'status',
      key: 'status',
    },
  ];



  const config = {
    data: data1,
    xField: 'time',
    yField: 'count',
    label: {
      position: 'middle',
      style: {
        fill: '#FFFFFF',
        opacity: 0.6,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
  };

  const config2 = {
    data: data2,
    xField: 'date',
    yField: 'count',
    label: {
      position: 'middle',
      style: {
        fill: '#FFFFFF',
        opacity: 0.6,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
  };


  return (
    <>
      <Row gutter={[16, 32]} style={{ margin: '10px' }}>
        <Col span={8}>
          <Card style={{ fontSize: '32px' }}>
            ผู้ใช้งาน : {data3}
          </Card>
        </Col>
        <Col span={8}>
          <Card style={{ fontSize: '32px' }}>
            โต๊ะที่ถูกจองวันนี้ : {data2 && data2[0]?.count || 0}
          </Card>
        </Col>
        <Col span={8}>
          <Card style={{ fontSize: '32px' }}>
            โต๊ะที่ถูกจองรายสัปดาห์ : {data1[0]?.count || 0}
          </Card>
        </Col>
        <Col span={24}>
          <Card>
            <div style={{ fontSize: '32px' }}>รายชื่อการจอง</div>
            <div style={{ margin: '10px' }}>
              <Table dataSource={bookings} columns={columns} />
            </div>
          </Card>
        </Col>

        <Col span={12}>
          <Card>
            <div style={{ fontSize: '32px' }}> ยอดจองรายวัน</div>
            <div style={{ margin: '10px' }}>
              {data2 ? <Column {...config2} /> : null}
            </div>
          </Card>
        </Col>
        <Col span={12}>
          <Card>
            <div style={{ fontSize: '32px' }}> ยอดจองรายสัปดาห์</div>
            <div style={{ margin: '10px' }}>
              {data1 ? <Column {...config} /> : null}
            </div>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default DashboardHome
