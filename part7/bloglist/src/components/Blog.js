import React from 'react'
import Togglable from './Togglable'

const Blog = ({ blog, updateBlog, removingBlog }) => {
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
    <div style={blogStyle} className="blog">
      {blog.title}
      <Togglable buttonLabel="show">
        <div>{blog.author}</div>
        <div>
          likes:{blog.likes} <button onClick={addLike}> like </button>
        </div>
        <div>{blog.url}</div>
        <div>
          <button onClick={() => removingBlog(blog.id, blog.title)}>
            remove
          </button>
        </div>
      </Togglable>
    </div>
  )
}

export default Blog
