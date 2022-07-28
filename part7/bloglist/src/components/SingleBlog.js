import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { removeBlog, updateBlog } from '../reducers/blogReducer'
import { useParams } from 'react-router-dom'
import Navbar from './Navbar'

const SingleBlog = () => {
  const blog = useSelector((state) => state.blog)
  const dispatch = useDispatch()

  const id = useParams().id
  const findBlog = blog.find((b) => b.id === id)

  const handleLikes = async (blog) => {
    dispatch(updateBlog(blog.id, { ...blog, likes: blog.likes + 1 }))
  }

  const handleDelete = async (blog) => {
    dispatch(removeBlog(blog.id))
  }

  if (!findBlog) {
    return <Navbar />
  }

  return (
    <div>
      <Navbar />
      <h2>{findBlog.title}</h2>
      <div>{findBlog.author}</div>
      <div>
        likes:{findBlog.likes}{' '}
        <button onClick={() => handleLikes(findBlog)}> like </button>
      </div>
      <div>
        <a href={findBlog.url}>{findBlog.url}</a>
      </div>
      <div>
        <button onClick={() => handleDelete(findBlog)}>remove</button>
      </div>
    </div>
  )
}

export default SingleBlog
