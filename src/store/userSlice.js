import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: 'Hello',
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state) => {
      state.state = 'login'
    },
    logout: (state) => {
      state.value ='logout'
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    },
  },
})

export const { login, logout,incrementByAmount} = userSlice.actions

export default userSlice.reducer