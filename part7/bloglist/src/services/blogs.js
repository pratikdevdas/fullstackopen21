import axios from 'axios'
const baseUrl = 'http://localhost:8000/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (id, blogUpdate) => {
  const response = await axios.put(`${baseUrl}/${id}`, blogUpdate)
  console.log(response.data)
  return response.data
}

const remove = (id) => {
  const config = {
    headers: { Authorization: token },
  }
  return axios.delete(`${baseUrl}/${id}`, config)
}

export default { getAll, create, update, setToken, remove }
