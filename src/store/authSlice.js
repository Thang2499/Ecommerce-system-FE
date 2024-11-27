import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isAuth:false,
  isLoading:false,
  user: null,
  accessToken:'',
  refreshToken:''
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state,action) => {
     state.isAuth = true
     state.user = action.payload.user
     state.accessToken = action.payload.accessToken
     state.refreshToken = action.payload.refreshToken
    },
    logout: (state) => {
      state.isAuth = false
      state.user = {}
      state.accessToken = ''
      state.refreshToken = ''
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload
    },
  },
})

export const { login, logout, setLoading } = authSlice.actions

export default authSlice.reducer