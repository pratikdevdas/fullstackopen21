import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Blog = () => {
  const blogStyle = {
    border: 'solid',
    borderWidth: 1,
    borderColor: 'black',
    padding: '10px',
  }

  const blog = useSelector((state) => state.blog)

  return (
    <>
      {blog.map((blog) => (
        <Link to={`/blogs/${blog.id}`} key={blog.id} className="blog">
          <div style={blogStyle}>{blog.title}</div>
        </Link>
      ))}
    </>
  )
}

export default Blog
