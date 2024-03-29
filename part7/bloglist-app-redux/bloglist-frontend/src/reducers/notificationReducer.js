import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    setNotification(state, action) {
      return action.payload
    },
    clearNotification(state, action) {
      return null
    }
  }
})

export const { setNotification, clearNotification } = notificationSlice.actions

export const showNotification = (className, message) => {
  return async dispatch => {
    dispatch(setNotification({ className, message }))
    setTimeout(() => {
      dispatch(clearNotification())
    }, 5000)

  }
}

export default notificationSlice.reducer