import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import userService from '../services/users'

const userSlice = createSlice({
  name: 'user',
  initialState: {
    currentUser: null,
    allUsers: null,
  },
  reducers: {
    loginUser: (state, action) => {
      state.currentUser = action.payload
    },
    logoutUser: (state) => {
      state.currentUser = null
    },
    setUsers: (state, action) => {
      state.allUsers = action.payload
    },
  },
})

export const { loginUser, logoutUser, setUsers } = userSlice.actions
export default userSlice.reducer

export const userLogin = (credentials) => {
  return async (dispatch) => {
    const userData = await loginService.login(credentials)
    dispatch(loginUser(userData))
  }
}

export const getUsers = () => {
  return async (dispatch) => {
    const userData = await userService.getAll()
    dispatch(setUsers(userData))
  }
}
