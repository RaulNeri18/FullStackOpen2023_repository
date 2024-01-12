import {
  Routes, Route, Link, useNavigate
} from 'react-router-dom'

import BlogList from './components/BlogList'
import Blog from './components/Blog'
import UserList from './components/UserList'
import User from './components/User'
import Notification from './components/Notification'

import { Form, Button, Navbar, Container, Nav, Row } from 'react-bootstrap'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { loginUser } from './services/login'
import { useEffect, useState } from 'react'
import { useBlogAppDispatch } from './BlogAppContext'

const App = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const dispatch = useBlogAppDispatch()
  const [login, setLogin] = useState(null)

  useEffect(() => {
    const userLogged = localStorage.getItem('userLogged')
    if (userLogged) {
      setLogin(userLogged)
      queryClient.setQueryData(['login'], userLogged)
    }
  }, [])

  const showMessage = (className, message) => {
    const content = { className, message }
    dispatch({ type: 'SHOW', payload: content })
    setTimeout(() => {
      dispatch({ type: 'CLEAR' })
    }, 5000)
  }

  const loginUserMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (dataUser) => {
      const stringDataUser = JSON.stringify(dataUser)
      localStorage.setItem('userLogged', stringDataUser)
      queryClient.setQueryData(['login'], stringDataUser)
      setLogin(stringDataUser)
    },
    onError: (error) => {
      //console.log('error', error.response.data.error)
      showMessage('danger', error.response.data.error)
    }
  })

  const handleLogin = async (event) => {
    event.preventDefault()
    const username = event.target.Username.value
    const password = event.target.Password.value
    loginUserMutation.mutate({ username, password })
  }

  const loginForm = () => (
    <Row className="justify-content-center">
      <div className="col-auto">
        <h2>Log in to application</h2>
        <Notification />
        <Form onSubmit={handleLogin} >
          <Form.Group>
            <Form.Label>Username:</Form.Label>
            <Form.Control type="text" name="Username"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password:</Form.Label>
            <Form.Control type="password" name="Password"
            />
          </Form.Group>
          <Button type="submit" style={ { marginTop: 5 } }>
            login
          </Button>
        </Form>
      </div>
    </Row>
  )

  const logout = () => {
    localStorage.removeItem('userLogged')
    queryClient.removeQueries(['login'])
    setLogin(null)
    navigate('/')
  }

  if (!login) {
    return (
      <div className="container">
        {loginForm()}
      </div>
    )
  }

  const anchor = {
    padding: 5,
    color: 'inherit',
    textDecoration: 'none'
  }

  const NavigationBar = () => (
    <Navbar expand="lg" bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="#home">Blog app</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#" as="span">
              <Link style={anchor} to="/blogs">Blogs</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link style={anchor} to="/users">Users</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              {login.name} logged in <button onClick={logout}>logout</button>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )

  return (
    <div className="container">
      <div>
        {NavigationBar()}
      </div>

      <div className="body-container">
        <Notification />

        <Routes>
          <Route path="/blogs/:id" element={ <Blog /> } />
          <Route path="/blogs" element={ <BlogList /> } />
          <Route path="/users/:id" element={ <User /> } />
          <Route path="/users" element={ <UserList /> } />
          <Route path="/" element={ <BlogList /> } />
        </Routes>

      </div>
    </div>
  )
}

export default App
