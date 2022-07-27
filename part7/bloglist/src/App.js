import React, { useState, useRef } from 'react'
import Blog from './components/Blog'

import blogService from './services/blogs'
// import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import { useDispatch, useSelector } from 'react-redux'
import { addNotification } from './reducers/notificationReducer'
import Navbar from './components/Navbar'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user.currentUser)

  //ref hook is used to extract a variable from a component and use it
  /*
  The useRef hook is used to create a blogFormRef ref,
   that is assigned to the Togglable component containing
    the creation blog form. The blogFormRef variable acts as
    a reference to the component. This hook ensures the same
     reference (ref) is kept throughout re-renders of the component.
  */
  const blogFormRef = useRef()
  if (user) {
    blogService.setToken(user.token)
  }
  //addingBlog
  const blogAdder = (blogObject) => {
    if (blogObject.title.length < 4) {
      dispatch(addNotification('Very Short'))
      setTimeout(() => {
        dispatch(addNotification(''))
      }, 5000)
    }
    blogService.create(blogObject).then((response) => {
      blogFormRef.current.toggleVisibility()
      setBlogs(blogs.concat(response))
      dispatch(addNotification(`added${blogObject.title}`))
      setTimeout(() => {
        dispatch(addNotification(''))
      }, 5000)
    })
  }

  if (user === null) {
    return (
      <>
        <div>
          <Togglable buttonLabel="Login">
            <LoginForm />
          </Togglable>
        </div>
      </>
    )
  }

  return (
    <div>
      <Navbar />
      <section className="header">
        <div className="notificationShow"></div>
      </section>

      <section>
        <h2>createNew</h2>
        <Togglable buttonLabel="Create a new Blog" ref={blogFormRef}>
          <BlogForm blogAdder={blogAdder} />
        </Togglable>
      </section>

      <Notification />
      <section className="blogsCreated">
        <Blog />
      </section>
    </div>
  )
}

export default App
