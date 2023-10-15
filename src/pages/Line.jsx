import liff from '@line/liff'
import React, { useEffect, useState } from 'react'
import API from '../lib/api'
import { useNavigate } from 'react-router-dom';
function Line() {

  const navigate = useNavigate();

  useEffect(() => {
    liff.init({ liffId: '2000508817-Gm9roeQZ' })
      .then(() => {
        handleLogin()
      })
  }, [])

  const handleLogin = async () => {
    try {
      const profile = await liff.getProfile();
      const res = await API.post('/api/loginline', (profile))
      console.log(profile);

      localStorage.setItem('token', 'tokenLine')
      localStorage.setItem('tel', res.data.tel)
      localStorage.setItem('userId', res.data.userId);
      localStorage.setItem('user', res.data.name);
      localStorage.setItem('level', res.data.level);
      localStorage.setItem('line', res.data.line);

      if (res.data.level === 'user') {
        navigate('/home');
      } else if (res.data.level === 'admin') {
        navigate('/dashboard');
      }

    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <div>Line</div>
    </div>
  )
}

export default Line;
