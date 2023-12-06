import { useState, useEffect } from 'react'
import Togglable from './components/Togglable'
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [alertNotification, setAlertNotification] = useState('')
  const [classNotification, setClassNotification] = useState('')
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUserBlog')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem('loggedUserBlog', JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      setClassNotification('error')
      setAlertNotification(error.response.data.error)
      setTimeout(() => {
        setAlertNotification('')
      }, 1 * 5 * 1000)
    }
  }

  const showNotificacion = (type, message) => {
    setClassNotification(type)
    setAlertNotification(message)
    setTimeout(() => {
      setAlertNotification('')
    }, 1 * 5 * 1000)
  }

  const createBlog = async (blogObject) => {
    try {
      blogService.setToken(user.token)
      const blogCreated = await blogService.create({ ...blogObject, user: user.id })
      showNotificacion('success', `a new blog ${blogCreated.title} by ${blogCreated.author} added`)
      setBlogs(blogs.concat(blogCreated))
    } catch (error) {
      showNotificacion('error', error.response.data.error)
    }
  }

  const updateBlog = async (blogObject) => {
    try {
      blogService.setToken(user.token)
      const blogUpdated = await blogService.update(blogObject)
      setBlogs(blogs.map(blog => blog.id !== blogUpdated.id ? blog : blogUpdated))
    } catch (error) {
      showNotificacion('error', error.response.data.error)
    }
  }

  const removeBlog = async (blogObject) => {
    try {
      blogService.setToken(user.token)
      await blogService.remove(blogObject.id)
      setBlogs(blogs.filter(blog => blog.id !== blogObject.id))
      showNotificacion('success', `blog ${blogObject.title} has been removed`)
    } catch (error) {
      showNotificacion('error', error.response.data.error)
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>Username: <input id='username' type='text' value={username} name='Username' onChange={({ target }) => setUsername(target.value)} /></div>
      <div>Password: <input id='password' type='password' value={password} name='Password' onChange={({ target }) => setPassword(target.value)} /></div>
      <button id='login-button' type='submit'>login</button>
    </form>
  )

  const logout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedUserBlog')
  }

  /*
  const blogSection = () => {
    <h2>blogs</h2>
    {blogs.map(blog =>
      <Blog key={blog.id} blog={blog} />
    )}
  }
*/
  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        {alertNotification ? (
          <Notification message={alertNotification} className={classNotification}/>) : null}
        {loginForm()}
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      {alertNotification ? (
        <Notification message={alertNotification} className={classNotification}/>) : null}

      <p>{user.name} logged in <button onClick={logout}>logout</button></p>

      <Togglable buttonName='create new blog'>
        <BlogForm createBlog={createBlog}/>
      </Togglable>

      {blogs.sort((a, b) => b.likes - a.likes)
        .map(blog =>
          <BlogList key={blog.id} blog={blog}
            userLogged={user}
            updateBlog={updateBlog}
            removeBlog={removeBlog}/>
        )}
    </div>
  )
}

export default App