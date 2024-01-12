import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Button, Col, ListGroup, Form, Row } from 'react-bootstrap'
import { createComment } from '../services/blogs'
import { useBlogAppDispatch } from '../BlogAppContext'

const Comments = ({ blog }) => {
  const queryClient = useQueryClient()
  const dispatch = useBlogAppDispatch()
  const login = JSON.parse(queryClient.getQueryData(['login']))
  const comments = queryClient.getQueryData(['blogs']).find(b => b.id === blog.id).comments

  const showMessage = (className, message) => {
    const content = { className, message }
    dispatch({ type: 'SHOW', payload: content })
    setTimeout(() => {
      dispatch({ type: 'CLEAR' })
    }, 5000)
  }

  const createCommentMutation = useMutation({
    mutationFn: createComment,
    onSuccess: (updatedBlog) => {
      const blogs = queryClient.getQueryData(['blogs'])
      const updatedBlogs = blogs.map(b => b.id === updatedBlog.id ? updatedBlog: b)
      queryClient.setQueryData(['blogs'], updatedBlogs)
    },
    onError: (error) => {
      showMessage('danger', error.response.data.error)
    }
  })

  const submitComment = async (event) => {
    event.preventDefault()
    const comment = event.target.Comment.value
    createCommentMutation.mutate({ token: login.token, id: blog.id, comment })
    event.target.Comment.value = ''

  }

  return (
    <div>
      <h3>Comments</h3>
      <Form onSubmit={submitComment}>
        <Row>
          <Col sm="6" md="5" lg="4">
            <Form.Control type="text" name='Comment' id='Comment'/>
          </Col>
          <Col sm="6" md="7" lg="8">
            <Button type='submit' size="sm">add comment</Button>
          </Col>
        </Row>
      </Form>

      <Col md="6">
        <ListGroup as="ol" numbered>
          {comments.map(comment =>
            <ListGroup.Item key={comment} as="li" style={{ wordWrap: 'break-word' }}>{comment}</ListGroup.Item>)}
        </ListGroup>
      </Col>
    </div>
  )
}

export default Comments