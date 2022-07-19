import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import { useDispatch } from 'react-redux'
import { addNotification } from './reducers/notificationReducer'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const dispatch = useDispatch()
  //ref hook is used to extract a variable from a component and use it

  /*
  The useRef hook is used to create a blogFormRef ref,
   that is assigned to the Togglable component containing
    the creation blog form. The blogFormRef variable acts as
    a reference to the component. This hook ensures the same
     reference (ref) is kept throughout re-renders of the component.
  */
  const blogFormRef = useRef()

  //useeffect to get it from windowlocal storage
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)

    try {
      const user = await loginService.login({
        username,
        password,
      })
      // saving token to browsers local storage
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)

      setUser(user)
      // for token change to call method
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch(addNotification('Wrong UserName or Password'))
      setTimeout(() => {
        dispatch(addNotification(''))
      }, 5000)
      console.log('error hogaya')
    }
  }

  //addingBlog
  const blogAdder = (blogObject) => {
    if (blogObject.title.length < 4) {
      dispatch(addNotification('Very Short'))
      setTimeout(() => {
        dispatch(addNotification(''))
      }, 5000)
      return console.log('give longer value')
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

  // updating likes
  // const updateBlog = async (blog) => {
  //   const updateData = {
  //     title: blog.title,
  //     author: blog.author,
  //     url: blog.url,
  //     likes: blog.likes,
  //   }
  //   try {
  //     await blogService.update(blog.id, updateData)
  //     const newBlogs = blogs.map((currentBlog) =>
  //       currentBlog.id === blog.id
  //         ? { ...currentBlog, likes: currentBlog.likes + 1 }
  //         : currentBlog
  //     )
  //     setBlogs(newBlogs)
  //   } catch (error) {
  //     console.log('error')
  //   }
  // }

  // removing blogs
  // const removeBlog = async (id, title) => {
  //   try {
  //     if (window.confirm(`Delete ${title}`)) {
  //       await blogService.remove(id)
  //       setBlogs(blogs.filter((blog) => blog.id !== id))
  //     }
  //   } catch (error) {
  //     console.log('error')
  //   }
  // }

  // sorting blogs according to like

  //logout
  const logOut = () => {
    const handleLogout = (event) => {
      event.preventDefault()
      setUser(null)
      window.localStorage.removeItem('loggedBlogappUser')
    }
    return (
      <div>
        <button onClick={handleLogout}>logOut</button>
      </div>
    )
  }

  if (user === null) {
    return (
      <>
        <div>
          <Togglable buttonLabel="Login">
            <LoginForm
              username={username}
              password={password}
              handleUsernameChange={({ target }) => setUsername(target.value)}
              handlePasswordChange={({ target }) => setPassword(target.value)}
              handleSubmit={handleLogin}
            />
          </Togglable>
        </div>
      </>
    )
  }

  return (
    <div>
      <section className="header">
        <h2>blogs</h2>
        <div className="notificationShow"></div>
        {user.name} loggedin
        {logOut()}
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
