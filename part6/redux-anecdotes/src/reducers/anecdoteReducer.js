const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

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

export default anectodeReducer