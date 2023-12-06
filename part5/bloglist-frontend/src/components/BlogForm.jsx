import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreateBlog = async (event) => {
    event.preventDefault()
    await createBlog({ title, author, url })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleCreateBlog}>
        <div>Title: <input type="text" value={title} name="title" onChange={({ target }) => setTitle(target.value)} id='title-input' /></div>
        <div>Author: <input type="text" value={author} name="author" onChange={({ target }) => setAuthor(target.value)} id='author-input'/></div>
        <div>Url: <input type="text" value={url} name="url" onChange={({ target }) => setUrl(target.value)} id='url-input'/></div>
        <button id='createBlog' type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm