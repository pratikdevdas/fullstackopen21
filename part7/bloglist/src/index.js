import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import blogService from './services/blogs'
import notificationReducer from './reducers/notificationReducer'
import blogReducer, { appendBlog } from './reducers/blogReducer'

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blog: blogReducer,
  },
})

blogService.getAll().then((blogs) =>
  blogs.forEach((blog) => {
    store.dispatch(appendBlog(blog))
  })
)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
