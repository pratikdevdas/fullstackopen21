import axios from 'axios'
const baseUrl = 'api/persons'

const getAll = () => {
  const request1 = axios.get(baseUrl)
  console.log(request1)
  return request1.then(response => response.data)
}

const create = (newObject) => {
  // console.log(newObject)
  const req = axios.post(baseUrl, newObject)
  return req.then(response => response.data)
}

const update = (id, updatedPerson) => {
  const req2 = axios.put(`${baseUrl}/${id}`, updatedPerson)
   return req2.then(response => response.data)
};


const remove = id => { 
  return axios.delete(`${baseUrl}/${id}`);
 }


export default { 
  getAll: getAll, 
  create:create,
  remove:remove,
  update:update,
 
}