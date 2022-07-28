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

export const { appendBlog, increaseLikes, filterDeletedBlogs, setBlogs } =
  blogSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (content) => {
  return async (dispatch) => {
    await blogService.create(content)
    dispatch(appendBlog(content))
  }
}

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
