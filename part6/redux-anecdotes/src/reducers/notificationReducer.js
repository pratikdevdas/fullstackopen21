import { createSlice } from "@reduxjs/toolkit";

const initialState = [{
    message: ''
}]

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

    // https://discord.com/channels/757581218085863474/878211601965137961/955791403567419433 (timeoutid)

let timeoutId;
export const { setNotification,unSetNotification } = notificationSlice.actions
export const manageNotification = (content, time) => {
    return  dispatch => {
        dispatch(setNotification(`you voteds ${content}`))
        if (timeoutId) {
            clearTimeout(timeoutId)
          }
          
       timeoutId = setTimeout(() => {
            dispatch(unSetNotification())
        }, time*1000);
        console.log(timeoutId)
    }
}
export default notificationSlice.reducer