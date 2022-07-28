import React, { useState, useRef, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import { useSelector, useDispatch } from 'react-redux'
import { createBlog, initializeBlogs } from './reducers/blogReducer'
import { addNotification } from './reducers/notificationReducer'
import Navbar from './components/Navbar'

const App = () => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const dispatch = useDispatch()

  const user = useSelector((state) => state.user.currentUser)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  if (user) {
    blogService.setToken(user.token)
  }
  //ref hook is used to extract a variable from a component and use it
  /*
  The useRef hook is used to create a blogFormRef ref,
   that is assigned to the Togglable component containing
    the creation blog form. The blogFormRef variable acts as
    a reference to the component. This hook ensures the same
     reference (ref) is kept throughout re-renders of the component.
  */

  const blogFormRef = useRef()

  const handleTitle = (event) => {
    event.preventDefault()
    setNewTitle(event.target.value)
  }

  const handleAuthor = (event) => {
    event.preventDefault()
    setNewAuthor(event.target.value)
  }

  const handleUrl = (event) => {
    event.preventDefault()
    setNewUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    const blog = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      likes: 0,
    }
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
    if (blog.title.length < 4) {
      dispatch(addNotification('Very Short'))
      setTimeout(() => {
        dispatch(addNotification(''))
      }, 5000)
    }
    blogFormRef.current.toggleVisibility()
    dispatch(createBlog(blog))
    dispatch(addNotification(`added${blog.title}`))
    setTimeout(() => {
      dispatch(addNotification(''))
    }, 5000)
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
          <BlogForm
            addBlog={addBlog}
            handleAuthor={handleAuthor}
            handleUrl={handleUrl}
            handleTitle={handleTitle}
            newAuthor={newAuthor}
            newUrl={newUrl}
            newTitle={newTitle}
          />
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
