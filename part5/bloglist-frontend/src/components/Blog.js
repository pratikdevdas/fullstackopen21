import React from 'react'
import Togglable from './Togglable'

const Blog = ({blog,updateBlog}) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }
  const addLike = () => {
    updateBlog({
      ...blog,
      likes: blog.likes + 1,
    })
  }
  return (
  <div style={blogStyle}>
         {blog.title}
         <Togglable buttonLabel='show'>
         <div>
          {blog.author} 
         </div>
         likes:{blog.likes} <button onClick={addLike}> like </button>
         <div>
         {blog.url}
         </div>
       </Togglable>
  </div>  
)}

export default Blog