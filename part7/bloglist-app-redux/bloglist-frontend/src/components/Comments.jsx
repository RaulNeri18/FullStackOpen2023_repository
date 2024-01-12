import { useDispatch, useSelector } from 'react-redux'
import { createComment } from '../reducers/blogReducer'
import { showNotification } from '../reducers/notificationReducer'
import { Button, Col, ListGroup, Form, Row } from 'react-bootstrap'

const Comments = ({ blog }) => {
  const dispatch = useDispatch()
  const login = useSelector(state => state.login)
  //const comments = useSelector(state => state.blogs.find(blog => blog.id === blog.id).comments)
  //console.log('comments', blog)

  const submitComment = async (event) => {
    event.preventDefault()
    try {
      const comment = event.target.Comment.value
      dispatch(createComment(login.token, blog.id, comment))
      event.target.Comment.value = ''
    } catch (error) {
      dispatch(showNotification('danger', error.response.data.error))
    }
  }

  return (
    <div>
      <h3>Comments</h3>
      <Form onSubmit={submitComment}>
        <Row>
          <Col sm="6" md="5" lg="4">
            <Form.Control type="text" name='Comment' />
          </Col>
          <Col sm="6" md="7" lg="8">
            <Button type='submit' size="sm">add comment</Button>
          </Col>
        </Row>
      </Form>

      <Col md="6">
        <ListGroup as="ol" numbered>
          {blog.comments.map(comment =>
            <ListGroup.Item key={comment} as="li" style={{ wordWrap: 'break-word' }}>{comment}</ListGroup.Item>)}
        </ListGroup>
      </Col>
    </div>
  )
}

export default Comments