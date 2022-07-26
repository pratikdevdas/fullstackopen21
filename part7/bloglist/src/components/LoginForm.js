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
      console.log(err, 'fsdf')
    }
  }

  return (
    <form onSubmit={loginUser}>
      <Notification />
      <h2>Login</h2>
      <div>
        username
        <input type="text" name="username" />
      </div>
      <div>
        password
        <input type="password" name="password" />
      </div>
      <button type="submit">login</button>
    </form>
  )
}

// proptypes for one of the component
LoginForm.propTypes = {
  username: PropTypes.string.isRequired,
}

export default LoginForm
