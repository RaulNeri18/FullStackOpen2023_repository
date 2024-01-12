const mongoose = require('mongoose')
const supertest = require('supertest')
const jwt = require('jsonwebtoken')
const app = require('../app')

const api = supertest(app)
const bcrypt = require('bcrypt')
const config = require('../utils/config')
const User = require('../models/user')
const Blog = require('../models/blog')
const helper = require('./test_api_helper')

beforeEach(async () => {
  await User.deleteMany({})
  await Blog.deleteMany({})

  const passwordHash = await bcrypt.hash('12345678', 10)
  const user = new User({ username: 'rnerip', name: 'Raul Neri', passwordHash })
  const userCreated = await user.save()

  const arrBlogMongoose = helper.initialBlogs.map(
    (blog) => new Blog({ ...blog, user: userCreated.id })
  )
  const arrPromiseSaved = arrBlogMongoose.map((blog) => blog.save())
  const blogsSaved = await Promise.all(arrPromiseSaved)
  user.blogs = user.blogs.concat(blogsSaved.map((blog) => blog.id))
  await user.save()
})

//4.8
test('notes are returned as json format', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
}, 100000)

//4.9
test('verifies that the unique identifier property is named id', async () => {
  const blogs = await helper.getAllBlogFromDb()
  //console.log('blogs', blogs)
  blogs.forEach((blog) => expect(blog.id).toBeDefined())
})

//4.10
test('successfully creates a new blog post, verify the total number and he content of the blog post', async () => {
  const newBlog = {
    title: 'title3',
    author: 'author3',
    url: 'url3',
    likes: 303
  }

  const allUsers = await helper.getAllUserFromDb()
  const userForToken = {
    id: allUsers[0].id,
    username: allUsers[0].username
  }

  const token = jwt.sign(userForToken, config.SECRET)

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const allBlogs = await helper.getAllBlogFromDb()
  expect(allBlogs).toHaveLength(helper.initialBlogs.length + 1)
  expect(allBlogs.map((blog) => blog.likes)).toContain(303)
})

//4.11
test('the likes property is missing from the request', async () => {
  const newBlog = {
    title: 'title4',
    author: 'author4',
    url: 'url4'
  }

  const allUsers = await helper.getAllUserFromDb()
  const userForToken = {
    id: allUsers[0].id,
    username: allUsers[0].username
  }
  const token = jwt.sign(userForToken, config.SECRET)

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
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

  const allUsers = await helper.getAllUserFromDb()
  const userForToken = {
    id: allUsers[0].id,
    username: allUsers[0].username
  }
  const token = jwt.sign(userForToken, config.SECRET)

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)
    .expect(400)

  const allBlogs = await helper.getAllBlogFromDb()
  expect(allBlogs).toHaveLength(helper.initialBlogs.length)
})

//4.13
test('for deleting a single blog post', async () => {
  const allBlogs = await helper.getAllBlogFromDb()
  const blogToDelete = allBlogs[0]

  const allUsers = await helper.getAllUserFromDb()
  const userForToken = {
    id: allUsers[0].id,
    username: allUsers[0].username
  }
  const token = jwt.sign(userForToken, config.SECRET)

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .set('Authorization', `Bearer ${token}`)
    .expect(204)

  const allBlogsAfter = await helper.getAllBlogFromDb()
  expect(allBlogsAfter).toHaveLength(helper.initialBlogs.length - 1)

  const titles = allBlogsAfter.map((r) => r.title)
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
  //console.log('blogToUpdate', blogToUpdate)
  const response = await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(updatedData)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  //console.log('response', response.body)

  expect(response.body.title).toBe(updatedData.title)
  expect(response.body.author).toBe(updatedData.author)
  expect(response.body.url).toBe(updatedData.url)

  const blogsAfter = await Blog.findById(blogToUpdate.id)
  expect(blogsAfter.title).toBe(updatedData.title)
  expect(blogsAfter.author).toBe(updatedData.author)
  expect(blogsAfter.url).toBe(updatedData.url)
})

//4.14
test('for updating the number of likes for a blog post', async () => {
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

//4.16
describe('users creation', () => {
  test('repeated usernames are not created', async () => {
    const allUsers = await helper.getAllUserFromDb()
    const newUser = {
      username: 'rnerip',
      name: 'Raul Neri',
      password: '12345678'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const allUsersAtEnd = await helper.getAllUserFromDb()
    expect(allUsers).toEqual(allUsersAtEnd)
  })

  test('empty usernames are not created', async () => {
    const allUsers = await helper.getAllUserFromDb()
    const newUser = {
      username: '',
      name: 'Raul Neri',
      password: '12345678'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const allUsersAtEnd = await helper.getAllUserFromDb()
    expect(allUsers).toEqual(allUsersAtEnd)
  })

  test('usernames less than 3 characters are not created', async () => {
    const allUsers = await helper.getAllUserFromDb()
    const newUser = {
      username: 'cn',
      name: 'Raul Neri',
      password: '12345678'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const allUsersAtEnd = await helper.getAllUserFromDb()
    expect(allUsers).toEqual(allUsersAtEnd)
  })
})

//4.23
test('error 401 when token is not provided', async () => {
  const newBlog = {
    title: 'title3',
    author: 'author3',
    url: 'url3',
    likes: 303
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(401)
    .expect('Content-Type', /application\/json/)

  const allBlogs = await helper.getAllBlogFromDb()
  expect(allBlogs).toHaveLength(helper.initialBlogs.length)
})

afterAll(async () => {
  await mongoose.connection.close()
})
