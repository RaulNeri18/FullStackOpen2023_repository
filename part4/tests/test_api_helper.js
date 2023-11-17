const Blog = require('../models/blog')

const initialBlogs = [
  {
    "title": "title1",
    "author": "author1",
    "url": "url1",
    "likes": 100
  },
  {
    "title": "title2",
    "author": "author2",
    "url": "url2",
    "likes": 200
  }
]

module.exports = { initialBlogs }