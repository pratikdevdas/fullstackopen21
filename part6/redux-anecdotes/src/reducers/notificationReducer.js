import { createSlice } from "@reduxjs/toolkit";

const initialState = [{
    message: ''
}
]

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers:{
         setNotification : (state, action) => {
            const message = action.payload
            console.log(state)
            state.push({message})
        },
        unSetNotification : (state) => {
            const message = ''
            console.log(state)
            state.push({message})
        }
    }
})

export const { setNotification,unSetNotification } = notificationSlice.actions
export default notificationSlice.reducer