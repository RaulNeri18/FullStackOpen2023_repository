import { useAnecdotesValue } from "../AnecdotesContext"

const Notification = () => {
const messageValue = useAnecdotesValue()

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }
  
  return (
    messageValue && 
    <div style={style}>
      {messageValue}
    </div>
  )
}

export default Notification
