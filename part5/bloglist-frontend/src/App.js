import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const handleLogin = async(event) =>{
    event.preventDefault()
    console.log('logging in with',username,password)

    try{
      const user = loginService.login({
        username, password,
      })
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception){
      console.log('error hogaya')
    }
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

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
   
  return (
    <div>
     
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
      
    </div>
  )
}

export default App