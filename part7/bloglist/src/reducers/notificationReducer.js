import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: [],
  reducers: {
    addNotification: (state, action) => {
      const message = action.payload
      state.push({ message })
    },
  },
})

export const { addNotification } = notificationSlice.actions
export default notificationSlice.reducer
// complete the notification reducer with createSlice
