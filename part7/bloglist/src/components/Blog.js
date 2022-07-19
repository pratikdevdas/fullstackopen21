import React from 'react'
import { useSelector } from 'react-redux'
import Togglable from './Togglable'

const Blog = () => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const blog = useSelector((state) => state.blog)

  console.log(blog)

  return (
    <>
      {blog.map((blog) => (
        <div key={blog.id} style={blogStyle} className="blog">
          {blog.title}
          <Togglable buttonLabel="show">
            <div>{blog.author}</div>
            <div>
              likes:{blog.likes} <button> like </button>
            </div>
            <div>{blog.url}</div>
            <div>
              <button>remove</button>
            </div>
          </Togglable>
        </div>
      ))}
    </>
  )
}

export default Blog
