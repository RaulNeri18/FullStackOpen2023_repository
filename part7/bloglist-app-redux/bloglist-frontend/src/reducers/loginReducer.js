import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import { clearNotification, showNotification } from './notificationReducer'

const loginSlice = createSlice({
  name: 'login',
  initialState: null,
  reducers: {
    setLogin(state, action) {
      return action.payload
    },
    logOut(state, action) {
      return null
    }
  }
})

export const { setLogin, logOut } = loginSlice.actions

export const loginUser = (username, password) => {
  return async dispatch => {
    let user
    try {
      user = JSON.parse(localStorage.getItem('userLogged'))
      if (!user) {
        user = await loginService.login({ username, password })
        localStorage.setItem('userLogged', JSON.stringify(user))
      }
      dispatch(setLogin(user))
      dispatch(clearNotification())
    } catch (error) {
      dispatch(showNotification('danger', error.response.data.error))
    }
  }
}

export const loginOut = () => {
  return async dispatch => {
    localStorage.removeItem('userLogged')
    dispatch(logOut())
  }
}

export default loginSlice.reducer