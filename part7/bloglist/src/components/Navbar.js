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
      <Link to="/users" onClick={loadUsers}>
        User
      </Link>
      <br />
      <Link to="/" onClick={loadUsers}>
        Home
      </Link>
      <h2>blogs</h2>
      {user?.name} loggedin
      <button onClick={handleLogout}>logout</button>
    </div>
  )
}

export default Navbar
