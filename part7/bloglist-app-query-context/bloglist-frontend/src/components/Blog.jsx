import { useNavigate, useParams } from 'react-router-dom'
import Comments from './Comments'
import ModalAlert from './ModalAlert'
import { useState } from 'react'
import { Button, Col, Table } from 'react-bootstrap'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { update, remove } from '../services/blogs'
import { useBlogAppDispatch } from '../BlogAppContext'

const Blog = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const dispatch = useBlogAppDispatch()
  const [show, setShow] = useState(false)

  const paramBlogId = useParams().id
  const login = JSON.parse(queryClient.getQueryData(['login']))
  console.log('2', queryClient.getQueryData(['blogs']))
  const blog = queryClient.getQueryData(['blogs']).find(blog => blog.id === paramBlogId)

  console.log('3', blog)
  //console.log('Blog/login', login)

  const showMessage = (className, message) => {
    const content = { className, message }
    dispatch({ type: 'SHOW', payload: content })
    setTimeout(() => {
      dispatch({ type: 'CLEAR' })
    }, 5000)
  }

  const updateBlogMutation = useMutation({
    mutationFn: update,
    onSuccess: (updatedBlog) => {
      const blogs = queryClient.getQueryData(['blogs'])
      const updatedBlogs = blogs.map(blog => blog.id === updatedBlog.id ? updatedBlog: blog)
      queryClient.setQueryData(['blogs'], updatedBlogs)
    },
    onError: (error) => {
      showMessage('danger', error.response.data.error)
    }
  })

  const removeBlogMutation = useMutation({
    mutationFn: remove,
    onSuccess: () => {
      const blogs = queryClient.getQueryData(['blogs'])
      const removedBlogs = blogs.filter(b => b.id !== blog.id)
      queryClient.setQueryData(['blogs'], removedBlogs)
      showMessage('success', `blog ${blog.title} has been removed`)
    },
    onError: (error) => {
      showMessage('danger', error.response.data.error)
    }
  })

  const handleUpdateBlog = async () => {
    const blogObject = { ...blog, likes: blog.likes + 1 }
    updateBlogMutation.mutate({ token: login.token, blog: blogObject })
  }

  const handleRemoveBlog = async () => {
    setShow(false)
    removeBlogMutation.mutate({ token: login.token, id: blog.id })
    navigate('/')
  }

  return (
    <div>
      <h2>{blog.title}</h2>

      {(blog.user.name.toString() === login.name) && (
        <div>
          <Button onClick={() => setShow(true)} variant="danger" size="sm">Delete Blog</Button>
          <ModalAlert show={show}
            handleClose={() => setShow(false)}
            handleRemove={handleRemoveBlog}
            title='Warning'
            message={`Are you sure you want to Remove blog '${blog.title}' by '${blog.author}'?`}/>
        </div>
      )}
      <Col md="6">
        <Table striped bordered hover variant="light">
          <tbody>
            <tr>
              <td>Url:</td>
              <td><a target='_blank' href={`https://${blog.url}.com`} rel="noreferrer">{blog.url}</a></td>
            </tr>
            <tr>
              <td>Likes:</td>
              <td>{blog.likes}{' '} likes
                <Button onClick={handleUpdateBlog} variant="success" size="sm">
                  like
                </Button>
              </td>
            </tr>
            <tr>
              <td>Added by:</td>
              <td>{blog.user.name}</td>
            </tr>
          </tbody>
        </Table>
      </Col>

      <Comments blog={blog} />
    </div>
  )
}

export default Blog
