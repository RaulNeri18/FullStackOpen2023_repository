import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeUsers } from '../reducers/userReducer'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const UserList = () => {
  const dispatch = useDispatch()
  const users = useSelector(state => state.users)
  //console.log(users)

  useEffect(() => {
    dispatch(initializeUsers())
  }, [])

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