import { Form } from 'react-bootstrap'

const BlogForm = () => {
  return (
    <div>
      <Form.Label>Title</Form.Label>
      <Form.Control required type="text" name="Title" />

      <Form.Label>Author</Form.Label>
      <Form.Control required type="text" name="Author" />

      <Form.Label>Url</Form.Label>
      <Form.Control required type="url" name="Url" />

    </div>
  )
}

export default BlogForm
