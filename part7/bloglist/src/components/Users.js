import React from 'react'
import Navbar from './Navbar'

import { useSelector } from 'react-redux'

const Users = () => {
  const users = useSelector((state) => state.user.allUsers)
  console.log(users)

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
          <div>{user.name}</div>
          <div>{user.blogs.length}</div>
        </div>
      ))}
    </div>
  )
}

export default Users
