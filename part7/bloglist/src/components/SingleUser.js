import React from 'react'
import { useParams } from 'react-router-dom'
import Navbar from './Navbar'
import { useSelector } from 'react-redux'

const SingleUser = () => {
  const users = useSelector((state) => state.user.allUsers)
  const id = useParams().id
  const findUser = users.find((n) => n.id === id)
  return (
    <div className="max-w-4xl mx-auto">
      <Navbar />
      <h2 className="text-3xl bold">{findUser.name}</h2>
      Added blogs -:
      {findUser.blogs.map((blog) => (
        <li key={blog.id}>{blog.title}</li>
      ))}
    </div>
  )
}

export default SingleUser
