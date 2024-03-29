import axios from 'axios'
const baseUrl = '/api/blogs'
let token = null

const setToken = (newToken) => (token = `Bearer ${newToken}`)

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (blog) => {
  const config = { headers: { Authorization: token } }
  const response = await axios.post(baseUrl, blog, config)
  return response.data
}

const update = async (blog) => {
  const config = { headers: { Authorization: token } }
  const response = await axios.put(`${baseUrl}/${blog.id}`, blog, config)
  return response.data
}

const remove = async (id) => {
  const config = { headers: { Authorization: token } }
  return await axios.delete(`${baseUrl}/${id}`, config)
}

const createComment = async (id, comment) => {
  const config = { headers: { Authorization: token } }
  const requestBody = { content: comment }
  const response = await axios.put(`${baseUrl}/${id}/comments`, requestBody, config)
  return response.data
}

export default { setToken, getAll, create, update, remove, createComment }
