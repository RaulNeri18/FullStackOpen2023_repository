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
  const populatedResult = await Blog.findById(result._id).populate('user', {
    blogs: 0
  })

  user.blogs = user.blogs.concat(result._id)
  await user.save()
  response.status(201).json(populatedResult)
})

blogsRouter.delete(
  '/:id',
  middleware.userExtractor,
  async (request, response) => {
    const user = request.user
    const blog = await Blog.findById(request.params.id)
    //console.log('user', user)
    //console.log('blog', blog.user)
    if (user.id === blog.user.toString()) {
      await Blog.deleteOne({ _id: blog.id })
      console.log('user.blogs', user.blogs)
      user.blogs = user.blogs.filter(
        (userBlog) => userBlog.toString() !== blog.id.toString()
      )
      console.log('user.blogs', user.blogs)
      await user.save()
    }

    response.status(204).end()
  }
)

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) response.json(blog)
  else response.status(404).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const blog = request.body
  const newBlog = {
    title: blog.title,
    author: blog.author,
    likes: blog.likes,
    url: blog.url
  }

  const blogUpdated = await Blog.findByIdAndUpdate(request.params.id, newBlog, {
    new: true
  }).populate('user', { blogs: 0 })
  response.json(blogUpdated)
})

blogsRouter.put('/likes/:id', async (request, response) => {
  let blog = await Blog.findById(request.params.id)
  blog.likes += 1
  const blogUpdated = await blog.save()

  response.json(blogUpdated)
})

blogsRouter.put('/:id/comments', async (request, response) => {
  const comment = request.body
  console.log('request.body', request.body)
  const blog = await Blog.findById(request.params.id).populate('user', { blogs: 0 })
  blog.comments.push(comment.content)

  //console.log('newBlog', blog)

  const blogUpdated = await blog.save()
  response.json(blogUpdated)
})

module.exports = blogsRouter
