const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_api_helper')
const { after } = require('lodash')
const { default: mongoose } = require('mongoose')

api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})

  const arrBlogMongoose = helper.initialBlogs.map(blog => new Blog(blog))
  const arrPromiseSaved = arrBlogMongoose.map(blog => blog.save())
  await Promise.all(arrPromiseSaved)
})

test('notes are returned as json format', async() => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
}, 1000000)

afterAll(async () => {
  await mongoose.connection.close()
})