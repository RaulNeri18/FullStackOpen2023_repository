import { updateBlog, removeBlog } from '../reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'
import { showNotification } from '../reducers/notificationReducer'
import { useNavigate, useParams } from 'react-router-dom'
import Comments from './Comments'
import ModalAlert from './ModalAlert'
import { useState } from 'react'
import { Button, Col, Table } from 'react-bootstrap'

const Blog = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [show, setShow] = useState(false)

  const paramBlogId = useParams().id
  const login = useSelector(state => state.login)
  const blog = useSelector(state => state.blogs.find(blog => blog.id === paramBlogId))

  if (!blog) {
    return null
  }

  const handleUpdateBlog = async () => {
    const blogObject = { ...blog, likes: blog.likes + 1 }
    try {
      dispatch(updateBlog(login.token, blogObject))
    } catch (error) {
      dispatch(showNotification('danger', error.response.data.error))
    }
  }

  const handleRemoveBlog = async () => {
    try {
      setShow(false)
      dispatch(removeBlog(login.token, blog.id))
      dispatch(showNotification('success', `blog ${blog.title} has been removed`))
      navigate('/')
    } catch (error) {
      dispatch(showNotification('danger', error.response.data.error))
    }
  }

  return (
    <div>
      <h2>{blog.title}</h2>

      {(blog.user.name.toString() === login.name) && (
        <div>
          <Button onClick={() => setShow(true)} variant="danger" size="sm">Delete Blog</Button>
          <ModalAlert show={show}
            handleClose={() => setShow(false)}
            handleRemove={handleRemoveBlog}
            title='Warning'
            message={`Are you sure you want to Remove blog '${blog.title}' by '${blog.author}'?`}/>
        </div>
      )}
      <Col md="6">
        <Table striped bordered hover variant="light">
          <tbody>
            <tr>
              <td>Url:</td>
              <td><a target='_blank' href={`https://${blog.url}.com`} rel="noreferrer">{blog.url}</a></td>
            </tr>
            <tr>
              <td>Likes:</td>
              <td>{blog.likes}{' '} likes
                <Button onClick={handleUpdateBlog} variant="success" size="sm">
                  like
                </Button>
              </td>
            </tr>
            <tr>
              <td>Added by:</td>
              <td>{blog.user.name}</td>
            </tr>
          </tbody>
        </Table>
      </Col>

      <Comments blog={blog} />
    </div>
  )
}

export default Blog
