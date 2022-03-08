import { createSlice } from "@reduxjs/toolkit";

const initialState = [{
    message: 'Hi bro'
},{
    message: 'Heloo'
}]

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers:{
        showNotifications(state, action){
            const notify = action.payload
            state.push({notify})
        }
    }
})

export const { showNotifications } = notificationSlice.actions
export default notificationSlice.reducer