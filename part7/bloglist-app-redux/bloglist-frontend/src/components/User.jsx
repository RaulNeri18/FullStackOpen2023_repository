import { ListGroup } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const User = () => {
  const paramUserId = useParams().id

  const blogs = useSelector(state => state.blogs.filter(blog => blog.user.id === paramUserId))
  const user = useSelector(state => state.users.find(user => user.id === paramUserId))

  if (!user) {
    return null
  }

  return (
    <div>
      <h2>Author: {user.name}</h2>
      <h3>Added blogs</h3>

      <ListGroup as="ol" numbered>
        {blogs
          .map(blog => (
            <ListGroup.Item key={blog.id} as="li">{blog.title}</ListGroup.Item>
          ))}
      </ListGroup>
    </div>
  )
}

export default User
