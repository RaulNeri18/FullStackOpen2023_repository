import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdotes'

/*
const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]
*/

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

//const initialState = anecdotesAtStart.map(asObject)

/*
const anectodeReducer = (state = initialState, action) => {
  //console.log('state now: ', state)
  //console.log('action', action)
  switch(action.type) {
    case "NEW_ANECDOTE" : return state.concat(action.payload)
    case "NEW_VOTE" : {
      const anecdoteFound = state.find(anecdote => anecdote.id === action.payload.id)
      const newAnecdote = { ...anecdoteFound, votes: anecdoteFound.votes++ }
      return state.map(anecdote => anecdote.id !== newAnecdote.id ? anecdote : anecdoteFound)
    }
    default: return state
  }
}

export const addAnecdote = (anecdote) => {
  //console.log('anecdote.split', [anecdote])
  return {
    type: 'NEW_ANECDOTE',
    payload: [anecdote].map(asObject)
  }
}

export const addVote = (id) => {
  return {
    type: 'NEW_VOTE',
    payload: { id }
  }
}
*/

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    addAnecdote(state, action) {
      state.push(asObject(action.payload))
    },
    addVote(state, action) {
      const anecdoteFound = state.find(anecdote => anecdote.id === action.payload)
      anecdoteFound.votes++
      //return state.map(anecdote => anecdote.id !== anecdoteFound.id ? anecdote : anecdoteFound)
      //return state
    },
    setAnecdotes(state, action) {
      return action.payload
    },
    createAnecdotes(state, action) {
      state.push(action.payload)
    }
  }
})

//export default anectodeReducer
export const { addAnecdote, addVote, setAnecdotes, createAnecdotes } =  anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.create(asObject(content))
    dispatch(createAnecdotes(newAnecdote))
  }
}

export const likeAnecdote = (anecdote) => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.vote(anecdote)
    dispatch(addVote(updatedAnecdote.id))
  }
}

export default anecdoteSlice.reducer