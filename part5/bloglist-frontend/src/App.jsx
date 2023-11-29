import { useState, useEffect } from 'react'
import Blog from './components/Blog'
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
  const [title, setTitle] = useState(null)
  const [author, setAuthor] = useState(null)
  const [url, setUrl] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )  
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

  const handleCreateNote = async (event) => {
    event.preventDefault()
    try {
      blogService.setToken(user.token)
      const blogCreated = await blogService.create({title, author, url, user: user.id})
      //console.log('blogCreated', blogCreated)
      //console.log(blogs.concat(blogCreated))
      setClassNotification('success')
      setAlertNotification(`a new blog ${blogCreated.title} by ${blogCreated.author} added`)
      setBlogs(blogs.concat(blogCreated))
    } catch (error) {
      setClassNotification('error')
      setAlertNotification(error.response.data.error)
      setTimeout(() => {
        setAlertNotification('')
      }, 1 * 5 * 1000)
    }


  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>Username: <input type="text" value={username} name="Username" onChange={({target}) => setUsername(target.value)} /></div>
      <div>Password: <input type="password" value={password} name="Password" onChange={({target}) => setPassword(target.value)} /></div>
      <button type="submit">login</button>
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

      <p>{user.name} logged in <input type="button" value="logout" onClick={logout} /></p>

      <h2>create new</h2>
      <form onSubmit={handleCreateNote}>
        <div>Title: <input type="text" value={title} name="title" onChange={({target}) => setTitle(target.value)} /></div>
        <div>Author: <input type="text" value={author} name="author" onChange={({target}) => setAuthor(target.value)} /></div>
        <div>Url: <input type="text" value={url} name="url" onChange={({target}) => setUrl(target.value)} /></div>
        <button type="submit">create</button>
      </form>

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App