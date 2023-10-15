import { configureStore } from '@reduxjs/toolkit'
import  userSlice  from './userslice'

export const store = configureStore({
  reducer: {
    user:userSlice,
  },
})