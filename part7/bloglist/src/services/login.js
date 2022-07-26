import axios from 'axios'
const baseUrl = 'http://localhost:8000/api/login'

const login = async (credentials) => {
  console.log(credentials)
  const response = await axios.post(baseUrl, credentials)
  console.log(response.data)
  return response.data
}

export default { login }
