import React from 'react'
import Navbar from './Navbar'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Users = () => {
  const users = useSelector((state) => state.user.allUsers)
  return (
    <div className="max-w-4xl mx-auto">
      <Navbar />

      <div className="mt-10">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>No Of Blogs</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id}>
                <th>{index + 1}</th>
                <td>
                  <Link to={`/users/${user.id}`}>
                    <div className="link link-primary">{user.name}</div>
                  </Link>
                </td>
                <td>{user.blogs.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Users
