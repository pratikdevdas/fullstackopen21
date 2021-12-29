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
  const [newTitle, setNewTitle] = useState("")
  const [newAuthor, setNewAuthor] = useState("")
  const [newUrl, setNewUrl] = useState("")
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setNewMessage] = useState(null)

// effect to get blogs
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

//useeffect to get it from windowlocal storage
useEffect(() => {
  const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
  if(loggedUserJSON){
    const user = JSON.parse(loggedUserJSON)
    setUser(user)
    blogService.setToken(user.token)
  }
}, [])

  const handleLogin = async(event) =>{
    event.preventDefault()
    console.log('logging in with',username,password)

    try{
      const user = await loginService.login({
        username, password,
      })
      console.log(user)
      // saving toekn to browesers local storage
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)

      setUser(user)
      // for token change to call method
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
    } catch (exception){
      setNewMessage(`wrong usernasme or password`)
      setTimeout(() => {
        setNewMessage(null)
      },5000)
      console.log('error hogaya')
    }
  }
  
  const handleTitle = (event) => {
    setNewTitle(event.target.value)   
  }

  const handleAuthor = (event) => {
    setNewAuthor(event.target.value)   
  }

  const handleUrl = (event) => {
    setNewUrl(event.target.value)   
    console.log(event.setNewUrl)
  }

  const blogAdder = (event) => {
    event.preventDefault()
    console.log('created with title', newTitle)
    const newBlog = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    }
    if(newBlog.title.length<4)
    {
      setNewMessage(`Very short`)
      setTimeout(() => {
        setNewMessage(null)
      },5000)
     return console.log('give longer value')
    }
    console.log('suceed')
    blogService.create(newBlog)
    .then(response=>{
      setBlogs(blogs.concat(response))
      setNewTitle("")
      setNewAuthor("")
      setNewUrl("")
      setNewMessage(`${newBlog.title} has been added`)
      setTimeout(() => {
        setNewMessage(null)
      },5000)
      console.log(response)
    })
  }

  const loginForm = () => {
    const hideWhenVisible = {display : loginVisible ? 'none' : ''}
    const showWhenVisible = {display : loginVisible ? '' : 'none'}
    return(
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>
            log in
          </button>
        </div>
        <div style={showWhenVisible}>
      <LoginForm
      message={message}
      username={username}
      password={password}
      handleUsernameChange={({ target }) => setUsername(target.value)}
      handlePasswordChange={({ target }) => setPassword(target.value)}
      handleSubmit={handleLogin}/>
      <button onClick={()=> setLoginVisible(false)}> cancel </button>
      </div>
      </div>
      )
  }
   const blogForm = () => {
    // const hideWhenVisible =  

     return(
       <Togglable buttonLabel="Create a new Blog">
      <BlogForm
      message={message}
      blogAdder={blogAdder}
      newTitle={newTitle}
      handleTitle={handleTitle}
      newAuthor={newAuthor}
      handleAuthor={handleAuthor}
      newUrl={newUrl}
      handleUrl={handleUrl}
      />
      </Togglable>
      )
   }

     //logout
     const logOut = () => {
      const handleLogout = (event) =>{
        event.preventDefault()
        setUser(null)
        window.localStorage.removeItem('loggedBlogappUser')
      }
      return (<div>
        <button onClick={handleLogout}>logOut</button>
      </div>)
    }

   if(user === null)
   return(
     <>{loginForm()}
     </>
   )

  return (
    <div>
      <section className='header'>
      <h2>blogs</h2>
      <div className="notificationShow">
        
      </div>
     {user.name} loggedin 
     {logOut()}
     </section>

     <section >
        <h2>createNew</h2>
        {blogForm()}
      </section>

     <section className="blogsCreated">
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
     </section>

    </div>
  )
}

export default App