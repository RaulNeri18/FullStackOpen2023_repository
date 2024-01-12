import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

import { showNotification } from './notificationReducer'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    addBlog(state, action) {
      state.push(action.payload)
    },
    modifyBlog(state, action) {
      return state.map(blog => blog.id === action.payload.id ? action.payload : blog)
    },
    deleteBlog(state, action) {
      return state.filter(blog => blog.id !== action.payload)
    },
    setComments(state, action) {
      const blog = state.find(blog => blog.id === action.payload.id)

      blog.comments.push(action.payload.comment)
    }
  }
})

export const { setBlogs, addBlog, modifyBlog, deleteBlog, setComments } = blogSlice.actions

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (token, blog) => {
  return async dispatch => {
    blogService.setToken(token)
    const createdBlog = await blogService.create(blog)
    dispatch(addBlog(createdBlog))
    dispatch(showNotification('success', `a new blog ${createdBlog.title} by ${createdBlog.author} added`))
  }
}

export const updateBlog = (token, blog) => {
  return async dispatch => {
    blogService.setToken(token)
    const updatedBlog = await blogService.update(blog)
    dispatch(modifyBlog(updatedBlog))
  }
}

export const removeBlog = (token, id) => {
  return async dispatch => {
    blogService.setToken(token)
    await blogService.remove(id)
    dispatch(deleteBlog(id))
  }
}

export const createComment = (token, id, comment) => {
  return async dispatch => {
    blogService.setToken(token)
    await blogService.createComment(id, comment)
    //console.log('id', id)
    //console.log('content', content)
    dispatch(setComments({ id, comment }))
  }
}

export default blogSlice.reducer