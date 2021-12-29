import React from 'react'

const LoginForm = ({
    message,
    username,
    password,
    handleUsernameChange,
    handlePasswordChange,
    handleSubmit
}) => {
    return(
    <form onSubmit={handleSubmit}>
      {/* <div>{message}</div> */}
      <h2>Login</h2>
          <div>
           username
        <input 
        type="text" 
        value={username} 
        name="Username" 
        onChange={handleUsernameChange} 
        />
        </div>
        <div>
           password
        <input 
        type="password" 
        value={password} 
        name="Password" 
        onChange={handlePasswordChange}
        />
        </div>
        <button type="submit">login</button>
      </form>)
  }

export default LoginForm
