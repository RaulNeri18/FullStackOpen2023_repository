import axios from 'axios'
const baseUrl = '/api/blogs'
let token = null

const setToken = (newToken) => (token = `Bearer ${newToken}`)

export const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

export const create = async ({ token, blog }) => {
  const config = { headers: { Authorization: setToken(token) } }
  const response = await axios.post(baseUrl, blog, config)
  return response.data
}

export const update = async ({ token, blog }) => {
  const config = { headers: { Authorization: setToken(token) } }
  const response = await axios.put(`${baseUrl}/${blog.id}`, blog, config)
  return response.data
}

export const remove = async ({ token, id }) => {
  const config = { headers: { Authorization: setToken(token) } }
  return await axios.delete(`${baseUrl}/${id}`, config)
}

export const createComment = async ({ token, id, comment }) => {
  const config = { headers: { Authorization: setToken(token) } }
  const requestBody = { content: comment }
  const response = await axios.put(`${baseUrl}/${id}/comments`, requestBody, config)
  return response.data
}
