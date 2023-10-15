import React, { useEffect, useState } from 'react';
import '../../src/booking.css';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { Button, Form, Input, Radio, TimePicker, message } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { InfoCircleOutlined } from '@ant-design/icons';
import API from "../lib/api"
import moment from "moment-timezone"
import _ from "lodash"
import Navbar from '../components/Navbar';
import Swal from 'sweetalert2';

function ShowTable() {
    const numRows = 4; // จำนวนแถวของโต๊ะ
    const numCols = 5; // จำนวนคอลัมน์ของโต๊ะ
    const [tables, setTables] = useState();
    const [selectedTable, setSelectedTable] = useState(null);
    const [reservationInfo, setReservationInfo] = useState({
        name: '',
        numPeople: 0,
    });

    dayjs.extend(customParseFormat);
    const onChange = (time, timeString) => {
        console.log(new dayjs(time));
    };

    const [form] = Form.useForm();
    const [data, setData] = useState()

    const getData = async () => {
        let rawData = await API.get("api/booking", { params: { table: tables } })
        console.log(rawData.data);
        setData(rawData.data)
    }

    const [user, setUser] = useState()
    useEffect(() => {
        form.setFieldsValue({ customer: user, count: 1 })
        getData()
    }, [])


    let tableBooking = [
        ["A1", "A2", "A3", "A4", "A5"],
        ["B1", "B2", "B3", "B4", "B5"],
        ["C1", "C2", "C3", "C4", "C5"],
        ["D1", "D2", "D3", "D4", "D5"]
    ];

    return (
        <>
            <Navbar />
            <div className="container mt-3">
                <h2>แผนผังที่นั่ง</h2>
                <img src="stage.jpg" alt="STAGE" style={{ width: '100%' }} />

                <Form.Item
                    label={<span style={{ color: 'white' }}>โต๊ะ</span>}
                    name="table"
                    rules={[{ required: true }]}
                >
                    <Radio.Group className="custom-radio-group">
                        {data && tableBooking.map(row => (
                            <div key={row[0]} className="table-row">
                                {row.map(id => {
                                    let result = data?.find(res => res.table === id);
                                    return (
                                        <Radio.Button key={id} value={id} disabled={result}>
                                            {id}
                                        </Radio.Button>
                                    );
                                })}
                            </div>
                        ))}
                    </Radio.Group>
                    <div className="text-center">
                        <h2 style={{ color: 'white' }}>โต๊ะที่ว่าง : <span style={{ color: 'black', backgroundColor: 'white' }}> สีขาว</span></h2>
                        <h2 style={{ color: 'white' }}>โต๊ะที่ถูกจอง : <span style={{ color: 'black', backgroundColor: 'red' }}> สีแดง</span></h2>
                        <h2 style={{ color: 'white' }}>กรุณาทำการเข้าสู่ระบบก่อนทำการจองโต๊ะ</h2>
                    </div>
                </Form.Item>
            </div>
        </>
    );
}

export default ShowTable;
