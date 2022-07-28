import React from 'react'
import { useParams } from 'react-router-dom'
import Navbar from './Navbar'
import { useSelector } from 'react-redux'

const UsersData = () => {
  const users = useSelector((state) => state.user.allUsers)
  const id = useParams().id
  const findUser = users.find((n) => n.id === id)
  console.log(findUser)
  return (
    <div>
      <Navbar />
      <h2>{findUser.name}</h2>
      added blogs
      {findUser.blogs.map((blog) => (
        <li key={blog.id}>{blog.title}</li>
      ))}
    </div>
  )
}

export default UsersData
