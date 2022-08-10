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
    setComment('')
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Navbar />
      <div className="max-w-3xl mx-auto py-5 px-3">
        <div className="card w-96 bg-base-100 shadow-xl">
          <h2 className="card-title">{findBlog.title}</h2>
          <div className="badge badge-secondary">
            Author: {findBlog.author}{' '}
          </div>
          <a href={findBlog.url} className="link link-primary">
            {findBlog.url}
          </a>
          <span>Like Count : {findBlog.likes}</span>
          <div className="card-actions justify-end">
            <button
              className="badge badge-outline hover:bg-white hover:text-black"
              onClick={() => handleLikes(findBlog)}
            >
              like
            </button>
            <button
              className="badge badge-outline hover:bg-white hover:text-black"
              onClick={() => handleDelete(findBlog)}
            >
              delete
            </button>
          </div>
          <form onSubmit={addComment} className="py-3">
            <h3 className="text-lg my-2">Comments</h3>
            <input
              type="text"
              value={comment}
              onChange={handleComment}
              className="input input-bordered px-3 mx-3 w-42 h-7"
            />
            <button
              type="submit"
              className="badge badge-outline hover:bg-white hover:text-black"
            >
              add comment
            </button>
          </form>
          {findBlog.comments?.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SingleBlog
