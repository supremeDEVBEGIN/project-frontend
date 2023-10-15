import React, { useEffect, useState } from 'react';
import '../../src/booking.css';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { Button, Form, Input, Radio, TimePicker, message, DatePicker } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { InfoCircleOutlined } from '@ant-design/icons';
import API from "../lib/api"
import moment from "moment-timezone"
import _ from "lodash"
import Navbar from '../components/Navbar';
import Swal from 'sweetalert2';

function Booking() {
  const numRows = 4; // จำนวนแถวของโต๊ะ
  const numCols = 5; // จำนวนคอลัมน์ของโต๊ะ
  const [tables, setTables] = useState();
  const [selectedDate, setSelectedDate] = useState(new Date);
  const [reservationInfo, setReservationInfo] = useState({
    name: '',
    numPeople: 0,
  });

  dayjs.extend(customParseFormat);

  const onFinish = (values) => {
    console.log('Success:', values);

    Swal.fire({
      title: 'ยืนยันการจองโต๊ะ',
      text: 'คุณต้องการยืนยันการจองโต๊ะหรือไม่?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'ใช่, ยืนยัน',
      cancelButtonText: 'ยกเลิก'
    }).then((result) => {
      if (result.isConfirmed) {
        const { time } = values;
        const formattedDate = dayjs(selectedDate).format('YYYY-MM-DD');
        console.log('formattedDate:', formattedDate);
        API.post('api/booking', { ...values, date: formattedDate, time: new Date(data.time), status: "รอการยืนยัน",line: localStorage.getItem("line") })
          .then(res => {
            Swal.fire({
              title: 'จองโต๊ะสำเร็จ',
              text: 'กรุณารอการยืนยัน',
              icon: 'success',
              confirmButtonText: 'ตกลง'
            }).then(() => {
              window.location.href = `/history/${user}`;
            });
          })
          .catch(res => {
            message.error(res.message);
          });
      }
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const handleReservationInfoChange = (e) => {
    const { name, value } = e.target;
    setReservationInfo({
      ...reservationInfo,
      [name]: value,
    });
  };

  const [form] = Form.useForm();
  const [data, setData] = useState();

  const getData = async (selectedDate) => {
    const formattedDate = dayjs(selectedDate).format('YYYY-MM-DD');
    console.log('วันที่ที่เลือก:', formattedDate);
    try {
      let rawData = await API.get("api/booking", { params: { date: formattedDate } });
      console.log(rawData.data);
      setData(rawData.data);

      const filteredTables = rawData.data.filter(item => item.date === formattedDate);
      setTables(filteredTables);
    } catch (error) {
      console.error('เกิดข้อผิดพลาดในการดึงข้อมูล:', error);
    }
  };



  const [user, setUser] = useState(localStorage.getItem("user"));
  useEffect(() => {
    form.setFieldsValue({ customer: user, count: 1 });
    getData();
  }, []);

  let arrTimeF = [];
  let arrTimeDf = [0, 1, 2, 3, 4, 5, 6, 7, 8, 22, 23, 24];
  function range() {
    let arrTime = [];
    arrTime = arrTimeDf.concat(arrTimeF);
    console.log(arrTime);
    return arrTime;
  }

  const LoopRadio = () => {
    let h = []
    if (data) {
      for (let index = 1; index < 10; index++) {
        h.push(<Radio.Button value={index}>A{index}</Radio.Button>)
      }
      return h
    }
  }

  let tableBooking = ["A1", "A2", "A3", "A4", "A5", "B1", "B2", "B3", "B4", "B5", "C1", "C2", "C3", "C4", "C5", "D1", "D2", "D3", "D4", "D5"]

  return (
    <>
      <Navbar />
      <div className="container mt-3">
        <h2>จองโต๊ะ</h2>
        <img src="stage.jpg" alt="STAGE" style={{ width: '100%' }} />
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label={<span style={{ color: 'white' }}>โต๊ะ</span>}
            name="table"
            rules={[{ required: true }]}
          >
            <Radio.Group className="custom-radio-group">
              {tables && tableBooking.map(id => {
                let result = tables?.find(res => { return res.table === id })
                if (result) {
                  return <Radio.Button value={id} disabled>{id}</Radio.Button>
                } else {
                  return <Radio.Button value={id}>{id} </Radio.Button>
                }
              })}
            </Radio.Group>
          </Form.Item>

          <Form.Item
            label={<span style={{ color: 'white' }}>ชื่อผู้จอง</span>}
            name="customer"
            rules={[{ required: true }]}
          >
            <Input placeholder="Name" />
          </Form.Item>

          <Form.Item
            label={<span style={{ color: 'white' }}>วันที่</span>}
            name="date"
            // rules={[{ required: true }]}
          >
            <DatePicker
              style={{ width: '100%' }}
              disabledDate={(current) => current && current < dayjs(moment().subtract(1,"day").startOf('day'))}
              defaultValue={dayjs(moment().startOf('day'))}
              onChange={(date, dateString) => {
                console.log(dateString);
                setSelectedDate(dateString);
                getData(dateString);
              }}
            />
          </Form.Item>

          <Form.Item
            label={<span style={{ color: 'white' }}>เบอร์โทร</span>}
            name="tel"
            rules={[{ required: true }]}
          >
            <Input placeholder="Tel" />
          </Form.Item>

          <Form.Item
            label={<span style={{ color: 'white' }}>จำนวนคน</span>}
            name="count"
            rules={[{ required: true }]}
          >
            <Input placeholder="input placeholder" type='number' />
          </Form.Item>

          <Form.Item>
            <p style={{ color: 'white' }}>เงื่อนไขการจองโต๊ะ:</p>
            <p style={{ color: 'white' }}>-กรุณามาก่อนเวลา 20.00น. (ศ.-ส. หลุด 19.00น.) เพื่อไม่ให้โต๊ะหลุด</p>
            <p style={{ color: 'white' }}>1 โต๊ะ นั่งได้ไม่เกิน 6 ท่าน</p>
          </Form.Item>
          <Form.Item >
            <Button type="primary" htmlType="submit" style={{ width: '200px', height: '40px' }}>
              ยืนยันการจอง
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
}

export default Booking;
