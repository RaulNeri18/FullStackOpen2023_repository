import { createSlice } from '@reduxjs/toolkit'

/*
const filterReducer = (state = '', action) => {
  switch (action.type) {
    case 'HAS_FILTER': {
      //console.log('action.payload', action.payload)
      return action.payload}
    default: return state
  }
}

export const filterChange = filter => {
  //console.log('filter', filter)
  return {
    type: 'HAS_FILTER',
    payload: filter,
  }
}
*/

const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    applyFilter(state, action) {
      return action.payload
    }
  }
})

//export default filterReducer
export const { applyFilter } = filterSlice.actions
export default filterSlice.reducer