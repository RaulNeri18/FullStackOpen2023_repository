import { useQueryClient } from '@tanstack/react-query'
import { ListGroup } from 'react-bootstrap'
import { useParams } from 'react-router-dom'

const User = () => {
  const queryClient = useQueryClient()
  const paramUserId = useParams().id

  const blogs = queryClient.getQueryData(['blogs']).filter(blog => blog.user.id === paramUserId)
  const user = queryClient.getQueryData(['users']).find(user => user.id === paramUserId)

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
