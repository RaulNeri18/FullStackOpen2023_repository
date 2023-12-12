import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  const showNotification = notification.length > 0

  return (
    showNotification && (<div style={style}>
      {notification}
    </div>)
  )
}

export default Notification