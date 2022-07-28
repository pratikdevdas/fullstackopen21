import React from 'react'
import { logoutUser, getUsers } from '../reducers/userReducer'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user.currentUser)
  const navigate = useNavigate()
  //logout
  const handleLogout = async () => {
    dispatch(logoutUser())
    navigate('/')
  }
  const loadUsers = async () => {
    dispatch(getUsers())
  }
  return (
    <div>
      <div style={{ display: 'flex' }}>
        <Link to="/users" onClick={loadUsers} style={{ paddingLeft: '10px' }}>
          User
        </Link>
        <Link to="/" onClick={loadUsers} style={{ paddingLeft: '10px' }}>
          Home
        </Link>
        <div style={{ paddingLeft: '10px', paddingRight: '10px' }}>
          {user?.name} loggedin
        </div>
        <button onClick={handleLogout}>logout</button>
      </div>
      <h2>blog app</h2>
    </div>
  )
}

export default Navbar
