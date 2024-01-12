import { useDispatch, useSelector } from 'react-redux'
import BlogForm from './BlogForm'
import { Link } from 'react-router-dom'
import { ListGroup } from 'react-bootstrap'
import ModalForm from './ModalForm'
import { createBlog } from '../reducers/blogReducer'
import { showNotification } from '../reducers/notificationReducer'

const BlogList = () => {
  const login = useSelector(state => state.login)
  const blogs = useSelector(state => state.blogs)

  const dispatch = useDispatch()

  const handleCreateBlog = async (event) => {
    event.preventDefault()
    try {
      const newBlog = {
        title: event.target.Title.value,
        author: event.target.Author.value,
        url: event.target.Url.value,
        user: login.id
      }
      //console.log('newBlog', newBlog)
      dispatch(createBlog(login.token, newBlog))

      event.target.Title.value = ''
      event.target.Author.value = ''
      event.target.Url.value = ''

    } catch (error) {
      dispatch(showNotification('danger', error.response.data.error))
    }
  }

  return (
    <div>
      <ModalForm modalTitle="Blog Form" buttonName="Create New Blog" primaryButton={handleCreateBlog}>
        <BlogForm />
      </ModalForm>

      <div className="bloglist">
        <ListGroup>
          {blogs
            .map(blog => (
              <ListGroup.Item key={blog.id} as={Link} to={`/blogs/${blog.id}`} className="bloglist-item">
                {blog.title}
              </ListGroup.Item>
            ))}
        </ListGroup>
      </div>
    </div>
  )
}

export default BlogList