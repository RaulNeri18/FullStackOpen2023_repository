const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_api_helper')

beforeEach(async () => {
  await Blog.deleteMany({})

  const arrBlogMongoose = helper.initialBlogs.map(blog => new Blog(blog))
  const arrPromiseSaved = arrBlogMongoose.map(blog => blog.save())
  await Promise.all(arrPromiseSaved)
})

//4.8
test('notes are returned as json format', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
}, 100000)

//4.9
test('verifies that the unique identifier property is named id', async() => {
  const blogs = await helper.getAllBlogFromDb()
  //console.log('blogs', blogs)
  blogs.forEach(blog => expect(blog.id).toBeDefined())
})

//4.10
test('successfully creates a new blog post, verify the total number and he content of the blog post', async () => {
  const newBlog = {
    title: 'title3',
    author: 'author3',
    url: 'url3',
    likes: 303
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const allBlogs = await helper.getAllBlogFromDb()
  expect(allBlogs).toHaveLength(helper.initialBlogs.length + 1)
  expect(allBlogs.map(blog => blog.likes)).toContain(303)
})

//4.11
test('the likes property is missing from the request', async () => {
  const newBlog = {
    title: 'title4',
    author: 'author4',
    url: 'url4'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const allBlogs = await helper.getAllBlogFromDb()
  expect(allBlogs).toHaveLength(helper.initialBlogs.length + 1)
})

//4.12
test('if title or url properties are missing, the backend responds code 400', async () => {
  const newBlog = {
    author: 'author5',
    likes: 505
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const allBlogs = await helper.getAllBlogFromDb()
  expect(allBlogs).toHaveLength(helper.initialBlogs.length)
})

//4.13
test('for deleting a single blog post', async () => {
  const allBlogs = await helper.getAllBlogFromDb()
  const blogToDelete = allBlogs[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  const allBlogsAfter = await helper.getAllBlogFromDb()
  expect(allBlogsAfter).toHaveLength(helper.initialBlogs.length - 1)

  const titles = allBlogsAfter.map(r => r.title)
  expect(titles).not.toContain(blogToDelete.title)
})

//4.14
test('for updating the information', async () => {
  const allBlogs = await helper.getAllBlogFromDb()
  const blogToUpdate = allBlogs[0]
  const updatedData = {
    title: 'title8',
    author: 'author8',
    url: 'url8'
  }
  console.log('blogToUpdate', blogToUpdate)
  const response = await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(updatedData)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  console.log('response', response.body)

  expect(response.body.title).toBe(updatedData.title)
  expect(response.body.author).toBe(updatedData.author)
  expect(response.body.url).toBe(updatedData.url)

  const blogsAfter = await Blog.findById(blogToUpdate.id)
  expect(blogsAfter.title).toBe(updatedData.title)
  expect(blogsAfter.author).toBe(updatedData.author)
  expect(blogsAfter.url).toBe(updatedData.url)
})

//4.14
test.only('for updating the number of likes for a blog post', async () => {
  const allBlogs = await helper.getAllBlogFromDb()
  const blogToUpdate = allBlogs[0]
  //console.log('blogToUpdate', blogToUpdate)

  const response = await api
    .put(`/api/blogs/likes/${blogToUpdate.id}`)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  //console.log('response', response.body)
  expect(response.body.title).toBe(blogToUpdate.title)
  expect(response.body.author).toBe(blogToUpdate.author)
  expect(response.body.url).toBe(blogToUpdate.url)
  expect(response.body.likes).toBe(blogToUpdate.likes + 1)

  const blogsAfter = await Blog.findById(blogToUpdate.id)
  //console.log('blogsAfter', blogsAfter)
  expect(blogsAfter.title).toBe(blogToUpdate.title)
  expect(blogsAfter.author).toBe(blogToUpdate.author)
  expect(blogsAfter.url).toBe(blogToUpdate.url)
  expect(blogsAfter.likes).toBe(blogToUpdate.likes + 1)
})

afterAll(async () => {
  await mongoose.connection.close()
})