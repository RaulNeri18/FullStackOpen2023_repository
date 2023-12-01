const Notification = ({ message, className }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={className}>
      <span>{message}</span>
    </div>
  )
}

export default Notification