import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'

const userSlice = createSlice({
  name: 'user',
  initialState: {
    currentUser: null,
  },
  reducers: {
    loginUser: (state, action) => {
      state.currentUser = action.payload
    },
  },
})

export const { loginUser } = userSlice.actions
export default userSlice.reducer

export const userLogin = (credentials) => {
  return async (dispatch) => {
    const userData = await loginService.login(credentials)
    dispatch(loginUser(userData))
  }
}
