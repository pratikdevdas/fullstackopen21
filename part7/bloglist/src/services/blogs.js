import axios from 'axios'
const baseUrl = 'http://localhost:8000/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
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
  return response.data
}

const remove = (id) => {
  const config = {
    headers: { Authorization: token },
  }
  return axios.delete(`${baseUrl}/${id}`, config)
}

const addComment = (id, comments) => {
  console.log(comments)
  return axios.post(`${baseUrl}/${id}/comments`, comments)
}

export default { getAll, create, update, setToken, remove, addComment }
