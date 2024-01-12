import BlogForm from './BlogForm'
import { Link } from 'react-router-dom'
import { ListGroup } from 'react-bootstrap'
import ModalForm from './ModalForm'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getAll, create } from '../services/blogs'
import { useBlogAppDispatch } from '../BlogAppContext'

const BlogList = () => {
  const queryClient = useQueryClient()
  const dispatch = useBlogAppDispatch()

  const login = JSON.parse(queryClient.getQueryData(['login']))

  const showMessage = (className, message) => {
    const content = { className, message }
    dispatch({ type: 'SHOW', payload: content })
    setTimeout(() => {
      dispatch({ type: 'CLEAR' })
    }, 5000)
  }

  const createBlogMutation = useMutation({
    mutationFn: create,
    onSuccess: (createdBlog) => {
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(['blogs'], blogs.concat(createdBlog))
      showMessage('success', `a new blog ${createdBlog.title} by ${createdBlog.author} added`)
    },
    onError: (error) => {
      showMessage('danger', error.response.data.error)
    }
  })

  const handleCreateBlog = async (event) => {
    event.preventDefault()
    const newBlog = {
      title: event.target.Title.value,
      author: event.target.Author.value,
      url: event.target.Url.value,
      user: login.id
    }
    createBlogMutation.mutate({ token: login.token, blog: newBlog })

    event.target.Title.value = ''
    event.target.Author.value = ''
    event.target.Url.value = ''
  }

  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: getAll,
    refetchOnWindowFocus: false
  })

  if ( result.isLoading ) {
    return <div>loading data...</div>
  }

  if (result.isError) return <div>BlogApp service not available due to problems in server</div>

  const blogs = result.data
  //console.log('1', blogs)

  return (
    <div>
      <ModalForm modalTitle="Blog Form" buttonName="Create New Blog" primaryButton={handleCreateBlog}>
        <BlogForm />
      </ModalForm>

      <div className="bloglist">
        <ListGroup>
          {blogs
            .map(blog => (
              <ListGroup.Item key={blog.id} as={Link} to={`/blogs/${blog.id}`} className="bloglist-item">
                {blog.title}
              </ListGroup.Item>
            ))}
        </ListGroup>
      </div>
    </div>
  )
}

export default BlogList