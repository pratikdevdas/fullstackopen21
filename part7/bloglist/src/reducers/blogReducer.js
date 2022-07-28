import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      state.push(action.payload)
    },
    setBlogs(state, action) {
      return action.payload
    },
    addBlogs(state, action) {
      const blog = action.payload
      state.push(blog)
    },
    filterDeletedBlogs(state, action) {
      const id = action.payload
      const blogToShow = state.find((n) => n.id === id)
      return state.filter((blog) => blog !== blogToShow)
    },
    increaseLikes(state, action) {
      /* The way its working: The updatelikes reducer fucntion is dispatched from BlogJs and the updatevote Dispatches show likes */
      const id = action.payload
      const blogToLike = state.find((n) => n.id === id)
      const changedBlog = {
        ...blogToLike,
        likes: blogToLike.likes + 1,
      }
      return state.map((blog) => (blog.id !== id ? blog : changedBlog))
    },
  },
})

export const {
  addBlogs,
  appendBlog,
  increaseLikes,
  filterDeletedBlogs,
  setBlogs,
} = blogSlice.actions

export const updateBlog = (id, content) => {
  return async (dispatch) => {
    await blogService.update(id, content)
    dispatch(increaseLikes(id))
  }
}

export const removeBlog = (id) => {
  return async (dispatch) => {
    await blogService.remove(id)
    dispatch(filterDeletedBlogs(id))
  }
}

export default blogSlice.reducer
