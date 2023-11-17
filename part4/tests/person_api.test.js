const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
})