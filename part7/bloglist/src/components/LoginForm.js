import PropTypes from 'prop-types'
import React from 'react'
import Notification from './Notification'
import { useDispatch } from 'react-redux'
import { userLogin } from '../reducers/userReducer'

const LoginForm = () => {
  const dispatch = useDispatch()
  const loginUser = async (event) => {
    try {
      event.preventDefault()
      const username = event.target.username.value
      const password = event.target.password.value
      event.target.username.value = ''
      event.target.password.value = ''
      dispatch(userLogin({ username, password }))
    } catch (err) {
      console.log(err, 'error logging in')
    }
  }

  return (
    <form onSubmit={loginUser}>
      <Notification />
      <h2>Login</h2>
      <div>
        Username :
        <input
          type="text"
          name="username"
          className="input input-bordered px-3 mx-3 w-64 h-7"
        />
      </div>
      <div>
        Password :
        <input
          type="password"
          name="password"
          className="input input-bordered px-3 mx-3 w-64 h-7"
        />
      </div>
      <button
        type="submit"
        className="badge badge-outline hover:bg-white hover:text-black"
      >
        login
      </button>
    </form>
  )
}

// proptypes for one of the component
LoginForm.propTypes = {
  username: PropTypes.string.isRequired,
}

export default LoginForm
