const middleware = require('../utils/middleware')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { blogs: 0 })
  response.json(blogs)
})

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
  const requestBlog = request.body
  const user = request.user

  const blog = new Blog({
    ...requestBlog,
    user: user._id
  })

  const result = await blog.save()
  user.blogs = user.blogs.concat(result._id)
  await user.save()
  response.status(201).json(result)

})

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
  const user = request.user
  const blog = await Blog.findById(request.params.id)
  //console.log('user', user)
  //console.log('blog', blog.user)
  if (user.id === blog.user.toString())
  {
    await Blog.deleteOne({ _id: blog.id })
    //console.log('user.blogs', user.blogs)
    user.blogs = user.blogs.filter(userBlog => userBlog.toString() !== blog.id.toString())
    //console.log('user.blogs', user.blogs)
    await user.save()
  }

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