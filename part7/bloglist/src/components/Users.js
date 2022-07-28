import React from 'react'
import Navbar from './Navbar'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Users = () => {
  const users = useSelector((state) => state.user.allUsers)
  return (
    <div>
      <Navbar />
      <h2>Users</h2>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '20%',
        }}
      >
        <div></div>
        <div>no of blogs</div>
      </div>
      {users.map((user) => (
        <div
          key={user.id}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '20%',
          }}
        >
          <Link to={`/users/${user.id}`}>
            <div>{user.name}</div>
          </Link>
          <div>{user.blogs.length}</div>
        </div>
      ))}
    </div>
  )
}

export default Users
