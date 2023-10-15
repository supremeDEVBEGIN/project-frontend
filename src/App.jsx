import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Booking from './pages/Booking'
import Profile from './pages/Profile'
import Line from './pages/Line'
import DashboardPage from './pages/admin/DashboardPage'
import UserManage from './pages/admin/userList/UserManage'
import DashboardHome from './pages/admin/home/DashboardHome'
import BookingList from './pages/admin/bookinglist/BookingList'
import AddUser from './pages/admin/userList/AddUser'
import EditUser from './pages/admin/userList/EditUser'
import EditBooking from './pages/admin/editbooking/EditBooking'
import History from './pages/History'
import './App.css'
import ShowTable from './pages/ShowTable'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/showtable' element={<ShowTable />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/line' element={<Line />} />
        <Route path='/profile/:tel' element={<Profile />} />
        <Route path='/home' element={<Home />} />
        <Route path='/booking' element={<Booking />} />
        <Route path='/history/:id' element={<History />} />


        {/* admin */}
        <Route path='/dashboard' element={
          <DashboardPage>
            <DashboardHome />
          </DashboardPage>
        } />

        <Route path='/usermanage' element={
          <DashboardPage>
            <UserManage />
          </DashboardPage>
        } />

        <Route path='/bookinglist' element={
          <DashboardPage>
            <BookingList />
          </DashboardPage>
        } />

        <Route path='/adduser' element={
          <DashboardPage>
            <AddUser />
          </DashboardPage>
        } />

        <Route path='/edituser/:id' element={
          <DashboardPage>
            <EditUser />
          </DashboardPage>
        } />
        <Route path='/editbooking/:id' element={
          <DashboardPage>
            <EditBooking />
          </DashboardPage>
        } />


      </Routes >
    </>
  )
}

export default App
