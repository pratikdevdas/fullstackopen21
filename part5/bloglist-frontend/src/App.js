import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
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
  
  const handleLogout = (event) =>{
    event.preventDefault()
    setUser(null)
    window.localStorage.removeItem('loggedBlogappUser')
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
      setNewMessage(`${newBlog} has been added`)
      .then(setTimeout(() => {
        setNewMessage(null)
      },5000)).catch(console.error('errror fir'))
      console.log(response)
    })
  }

  const loginForm = () => {
    return(
    <form onSubmit={handleLogin}>
      <div>{message}</div>
      <h2>Login</h2>
          <div>
           username
        <input 
        type="text" 
        value={username} 
        name="Username" 
        onChange={({target})=> setUsername(target.value)} 
        />
        </div>
        <div>
           password
        <input 
        type="password" 
        value={password} 
        name="Password" 
        onChange={({target})=> setPassword(target.value)}
        />
        </div>
        <button type="submit">login</button>
      </form>)
  }
   const blogForm = () => {
     return(
    <div>
      <div className='msg'>{message}</div>
    <form onSubmit={blogAdder}>
      {/* <div>{message}</div> */}
      <div>
        Title: <input value={newTitle} onChange={handleTitle}/>
      </div>
      <div>
        author: <input value={newAuthor} onChange={handleAuthor}/>
      </div>
      <div>
        url: <input value={newUrl} onChange={handleUrl}/>
      </div>
      <div>     
        <button type="submit">add</button>
      </div>
    </form>
  </div>)
   }


   if(user === null)
   return(
     <>{loginForm()}
     </>
   )

  //logout
   const logOut = () => {
    return (<div>
      <button onClick={handleLogout}>logOut</button>
    </div>)
  }

  
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