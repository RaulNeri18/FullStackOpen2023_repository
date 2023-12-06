import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogList = ({ blog, userLogged, updateBlog, removeBlog }) => {
  const [visibility, setVisibility] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const buttonName = visibility ? 'hide' : 'view'
  const visibilityControl = { display: visibility ? '' : 'none' }
  const changeVisibility = () => setVisibility(!visibility)

  const handleUpdateBlog = async () => {
    const objeto = { ...blog, likes: blog.likes + 1 }
    await updateBlog(objeto)
  }

  const handleRemoveBlog = async () => {
    const confirm = window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
    if (confirm)
      await removeBlog(blog)
  }

  const showRemoveButton = { display: (blog.user.name.toString() === userLogged.name) ? '' : 'none' }

  return (
    <div style={blogStyle} className='blog'>
      <div>
        {blog.title} {blog.author} <button onClick={changeVisibility}>{buttonName}</button>
      </div>
      <div style={visibilityControl} className="togglableContent">
        <div>{blog.url}</div>
        <div>likes {blog.likes} <button onClick={handleUpdateBlog} className='like'>like</button></div>
        <div>{blog.user.name}</div>
        <div style={showRemoveButton} className='removediv'>
          <button onClick={handleRemoveBlog}>remove</button>
        </div>
      </div>
    </div>
  )
}

BlogList.propTypes = {
  blog: PropTypes.object.isRequired,
  userLogged: PropTypes.object.isRequired,
  updateBlog: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired
}

export default BlogList