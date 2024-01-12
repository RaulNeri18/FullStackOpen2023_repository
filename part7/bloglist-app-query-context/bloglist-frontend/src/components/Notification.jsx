import { Alert } from 'react-bootstrap'
import { useBlogAppValue } from '../BlogAppContext'

const Notification = () => {
  const content = useBlogAppValue()

  //console.log('content', content)

  if (!content) return null

  return (
    <>
      <Alert variant={content.className}>
        <span>{content.message}</span>
      </Alert>
    </>
  )
}

export default Notification
