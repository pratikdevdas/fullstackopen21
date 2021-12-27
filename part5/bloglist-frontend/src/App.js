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

      // for token change to call method
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception){
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
      return console.log('give longer value')
    }
    console.log('suceed')
    blogService.create(newBlog)
    .then(response=>{
      setBlogs(blogs.concat(response))
      setNewTitle("")
      setNewAuthor("")
      setNewUrl("")
      console.log(response)
    })
  }

  const loginForm = () => {
    return(
    <form onSubmit={handleLogin}>
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
     
   }

   if(user === null)
   return(
     <>{loginForm()}
     </>
   )

  //logout
   const logOut = () => {
    return (<div>
      <button onClick={()=>{setUser(null)}}>logOut</button>
    </div>)

  }
  return (

    <div>

      <section className='header'>
      <h2>blogs</h2>
     {user.name} loggedin 
     {logOut()}
     </section>

     <section className="newBlogCreation">
        <h2>createNew</h2>
         <div className="inputForm">
            <form onSubmit={blogAdder}>
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
          </div>
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