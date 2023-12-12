import { useSelector, useDispatch } from 'react-redux'
import { likeAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => {
    if (state.filter === '') return state.anecdotes
    return state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(state.filter.toLowerCase()))
  })
  //const anecdotes = useSelector(state => state.anecdotes)
  //console.log('anecdotes', anecdotes)
  const dispatch = useDispatch()

  const handleVoteClick = (anecdote) => {
    //dispatch(addVote(anecdote.id))
    dispatch(likeAnecdote(anecdote))
    //dispatch(setMessageVote(anecdote.content))
    dispatch(setNotification(`You voted '${anecdote.content}'`, 5))
  }

  const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes)
  //console.log('sortedAnecdotes', sortedAnecdotes)
  
  return (
    <div>
      {sortedAnecdotes.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => handleVoteClick(anecdote)}>vote</button>
            </div>
          </div>
        )}     
    </div>
  ) 
}

export default AnecdoteList