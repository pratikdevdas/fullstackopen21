import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { removeBlog, updateBlog } from '../reducers/blogReducer'
import Togglable from './Togglable'

const Blog = () => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const dispatch = useDispatch()

  const handleLikes = async (blog) => {
    dispatch(updateBlog(blog.id, { ...blog, likes: blog.likes + 1 }))
  }

  const handleDelete = async (blog) => {
    dispatch(removeBlog(blog.id))
  }
  const blog = useSelector((state) => state.blog)

  return (
    <>
      {blog.map((blog) => (
        <div key={blog.id} style={blogStyle} className="blog">
          {blog.title}
          <Togglable buttonLabel="show">
            <div>{blog.author}</div>
            <div>
              likes:{blog.likes}{' '}
              <button onClick={() => handleLikes(blog)}> like </button>
            </div>
            <div>{blog.url}</div>
            <div>
              <button onClick={() => handleDelete(blog)}>remove</button>
            </div>
          </Togglable>
        </div>
      ))}
    </>
  )
}

export default Blog
