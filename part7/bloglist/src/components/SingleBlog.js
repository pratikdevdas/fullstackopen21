import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { removeBlog, updateBlog, updateComment } from '../reducers/blogReducer'
import { useParams } from 'react-router-dom'
import Navbar from './Navbar'

const SingleBlog = () => {
  const [comment, setComment] = useState('')
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

  const handleComment = (event) => {
    setComment(event.target.value)
  }

  const addComment = (event) => {
    event.preventDefault()
    const comments = {
      comments: comment,
    }
    dispatch(updateComment(findBlog.id, comments))
  }
  console.log(findBlog)

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
      <h3>Comments</h3>
      <form onSubmit={addComment}>
        <input type="text" value={comment} onChange={handleComment} />
        <button type="submit">add comment</button>
      </form>
      {findBlog.comments?.map((b) => (
        <li key={b}>{b}</li>
      ))}
    </div>
  )
}

export default SingleBlog
