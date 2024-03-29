import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'
import { useQuery } from '@tanstack/react-query'
import { getAll } from '../services/users'

const UserList = () => {
  const result = useQuery({
    queryKey: ['users'],
    queryFn: getAll,
    refetchOnWindowFocus: false
  })

  if ( result.isLoading ) {
    return <div>loading data...</div>
  }

  const users = result.data

  return (
    <div>
      <h2>Users</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default UserList