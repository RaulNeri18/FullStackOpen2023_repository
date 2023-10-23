import { useState } from "react"

const AnecdoteSection = (props) => {
  return (
    <div>
      <h1>{props.title}</h1>
      {props.text} <br /> has {props.votes} votes
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const initVotes = new Array(anecdotes.length).fill(0)

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(initVotes)

  const updateCounter = () => {
    const newVotes = [...votes]
    newVotes[selected]++
    console.log(newVotes)
    setVotes(newVotes)
    console.log(Math.max(...votes))
  }

  const updateAnecdote = () => {
    let randomIndex = Math.floor(Math.random() * (anecdotes.length))
    console.log(randomIndex)
    setSelected(randomIndex)
  }

  const maxIndex = votes.indexOf(Math.max(...votes))
  console.log('Anecdote Max Index', maxIndex)

  return (
    <>
      <div>
        <AnecdoteSection title='Anecdote of the day' text={anecdotes[selected]} votes={votes[selected]}></AnecdoteSection>
        <div>
          <button onClick={updateCounter}>vote</button>
          <button onClick={updateAnecdote}>next anecdote</button>
        </div>
      </div>
      <div>
        <AnecdoteSection title='Anecdote with most votes' text={anecdotes[maxIndex]} votes={votes[maxIndex]}></AnecdoteSection>
      </div>
    </>
  )
}

export default App
