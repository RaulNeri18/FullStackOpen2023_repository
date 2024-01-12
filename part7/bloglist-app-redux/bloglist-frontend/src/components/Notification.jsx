import { Alert } from 'react-bootstrap'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)

  return (
    <>
      <Alert variant={notification.className}>
        <span>{notification.message}</span>
      </Alert>
    </>
  )
}

export default Notification
