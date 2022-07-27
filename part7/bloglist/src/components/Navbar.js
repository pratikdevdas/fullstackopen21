import React from 'react'
import { logoutUser, getUsers } from '../reducers/userReducer'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user.currentUser)
  //logout
  const logOut = () => {
    const handleLogout = async () => {
      dispatch(logoutUser())
    }
    return (
      <div>
        <button onClick={handleLogout}>logOut</button>
      </div>
    )
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
      {logOut()}
    </div>
  )
}

export default Navbar
