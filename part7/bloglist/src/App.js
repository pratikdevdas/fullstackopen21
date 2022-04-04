import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [loginVisible, setLoginVisible] = useState(false)
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setNewMessage] = useState(null)

  // effect to get blogs
  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

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
      console.log(user)
      // saving token to browsers local storage
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)

      setUser(user)
      // for token change to call method
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setNewMessage('wrong usernasme or password')
      setTimeout(() => {
        setNewMessage(null)
      }, 5000)
      console.log('error hogaya')
    }
  }

  //addingBlog
  const blogAdder = (blogObject) => {
    if (blogObject.title.length < 4) {
      console.log(blogAdder)
      setNewMessage('Very short')
      setTimeout(() => {
        setNewMessage(null)
      }, 5000)
      return console.log('give longer value')
    }

    blogService.create(blogObject).then((response) => {
      setBlogs(blogs.concat(response))
      setNewMessage(`${blogObject.title} added`)
      setTimeout(() => {
        setNewMessage(null)
      }, 5000)
    })
  }

  // updating likes
  const updateBlog = async (blog) => {
    const updateData = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes,
    }
    try {
      await blogService.update(blog.id, updateData)
      const newBlogs = blogs.map((currentBlog) =>
        currentBlog.id === blog.id
          ? { ...currentBlog, likes: currentBlog.likes + 1 }
          : currentBlog
      )
      setBlogs(newBlogs)
    } catch (error) {
      console.log('error')
    }
  }

  // removing blogs
  const removeBlog = async (id, title) => {
    try {
      if (window.confirm(`Delete ${title}`)) {
        await blogService.remove(id)
        setBlogs(blogs.filter((blog) => blog.id !== id))
      }
    } catch (error) {
      console.log('error')
    }
  }

  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }
    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>log in</button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm
            message={message}
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
          <button onClick={() => setLoginVisible(false)}> cancel </button>
        </div>
      </div>
    )
  }
  const blogForm = () => {
    return (
      <Togglable buttonLabel="Create a new Blog">
        <BlogForm message={message} blogAdder={blogAdder} />
      </Togglable>
    )
  }
  // sorting blogs according to like
  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)

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

  if (user === null) return <>{loginForm()}</>

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
        {blogForm()}
      </section>

      <section className="blogsCreated">
        {sortedBlogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            updateBlog={updateBlog}
            removingBlog={removeBlog}
          />
        ))}
      </section>
    </div>
  )
}

export default App
