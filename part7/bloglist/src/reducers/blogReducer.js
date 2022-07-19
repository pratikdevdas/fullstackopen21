import { createSlice } from '@reduxjs/toolkit'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      state.push(action.payload)
    },
    addBlogs(state, action) {
      const blog = action.payload
      state.push(blog)
    },
  },
})

export const { addBlogs, appendBlog } = blogSlice.actions
export default blogSlice.reducer
