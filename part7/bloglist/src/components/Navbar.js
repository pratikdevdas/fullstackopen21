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
    <div className="navbar bg-base-100">
      <div className="navbar-start w-full">
        <ul className="menu flex-row p-0 justify-between items-center w-full">
          <h2 className="normal-case text-xl">blog app</h2>
          <li className="normal-case">
            <div style={{ paddingLeft: '10px', paddingRight: '10px' }}>
              {user?.name} loggedin
            </div>
          </li>

          <li>
            <Link
              to="/"
              onClick={loadUsers}
              className="btn btn-active btn-ghost hover:btn-outline"
            >
              Home
            </Link>
          </li>

          <li>
            <Link
              to="/users"
              onClick={loadUsers}
              className="btn btn-active btn-ghost hover:btn-outline"
              style={{ paddingLeft: '10px' }}
            >
              User
            </Link>
          </li>

          <li>
            <button
              className="btn btn-active btn-ghost hover:btn-outline"
              onClick={handleLogout}
            >
              logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Navbar
