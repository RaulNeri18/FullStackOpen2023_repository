const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)

  const result = await blog.save()
  //console.log(result)
  response.status(201).json(result)

})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog)
    response.json(blog)
  else
    response.status(404).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const blog = request.body
  const newBlog = {
    title: blog.title,
    author: blog.author,
    url: blog.url
  }
  //console.log('newBlog', newBlog)
  const blogUpdated = await Blog.findByIdAndUpdate(request.params.id, newBlog, { new: true })
  response.json(blogUpdated)
})

blogsRouter.put('/likes/:id', async (request, response) => {
  let blog = await Blog.findById(request.params.id)
  blog.likes += 1
  //console.log('blog', blog)
  const blogUpdated = await blog.save()
  //const blogUpdated = await Blog.findByIdAndUpdate(request.params.id, newBlog, { new: true })
  //const blogUpdated = await Blog.findByIdAndUpdate(request.params.id, { $inc: { likes: 1 } } , { new: true })
  response.json(blogUpdated)
})

module.exports = blogsRouter