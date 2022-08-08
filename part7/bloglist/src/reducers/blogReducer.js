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
      console.log('wollo e,', action.payload)
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

    //https://jsbin.com/xehopoquso/edit?js,console
    setComments(state, action) {
      const id = action.payload.id
      const commentsToPush = action.payload.content.comments
      console.log(typeof commentsToPush)
      const blogWithUpdatedComment = state.find((n) => n.id === id)
      console.log(blogWithUpdatedComment)
      const changedBlog = {
        ...blogWithUpdatedComment,
        comments: blogWithUpdatedComment.comments.push(commentsToPush),
      }
      console.log(changedBlog)
      return state.map((blog) => (blog.id !== id ? blog : changedBlog))
    },
  },
})

export const {
  appendBlog,
  increaseLikes,
  filterDeletedBlogs,
  setBlogs,
  setComments,
} = blogSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (content) => {
  return async (dispatch) => {
    await blogService.create(content)
    console.log(content)
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

export const updateComment = (id, content) => {
  return async (dispatch) => {
    await blogService.addComment(id, content)
    dispatch(setComments({ id, content }))
  }
}

export default blogSlice.reducer
