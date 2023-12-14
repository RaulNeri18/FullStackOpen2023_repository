import { createContext, useReducer, useContext } from 'react'

const anecdotesReducer = (state, action) => {
    switch (action.type) {
      case "SHOW":
          return action.payload
      case "CLEAR":
          return ''
      default:
          return state
    }
  }

  const AnecdotesContext = createContext()
  
  export const useAnecdotesValue = () => {
    const anecdoteAndDispatch = useContext(AnecdotesContext)
    return anecdoteAndDispatch[0]
  }
  
  export const useAnecdotesDispatch = () => {
    const anecdoteAndDispatch = useContext(AnecdotesContext)
    return anecdoteAndDispatch[1]
  }

  export const AnecdotesContextProvider = (props) => {
    const [anecdote, anecdoteDispatch] = useReducer(anecdotesReducer, '')
  
    return (
      <AnecdotesContext.Provider value={[anecdote, anecdoteDispatch] }>
        {props.children}
      </AnecdotesContext.Provider>
    )
  }

  export default AnecdotesContext