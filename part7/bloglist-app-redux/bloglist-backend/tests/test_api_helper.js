const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'title1',
    author: 'author1',
    url: 'url1',
    likes: 100
  },
  {
    title: 'title2',
    author: 'author2',
    url: 'url2',
    likes: 200
  }
]

const getAllBlogFromDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map((blog) => blog.toJSON())
}

const getAllUserFromDb = async () => {
  const users = await User.find({})
  return users.map((user) => user.toJSON())
}

module.exports = { initialBlogs, getAllBlogFromDb, getAllUserFromDb }
