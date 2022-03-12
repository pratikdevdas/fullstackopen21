import { createSlice } from "@reduxjs/toolkit";

const initialState = [{
    filter: ''
}]

const filterSlice = createSlice({
    name: 'filtering',
    initialState,
    reducers:{
        setFilter : (state,action) => {
            const filter = action.payload
            console.log()
            state.push({filter})
        }
    }
})

export const { setFilter } = filterSlice.actions
export default filterSlice.reducer