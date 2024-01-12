const lodash = require('lodash')

const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((acum, actualBlog) => acum + actualBlog.likes, 0)
}

const favoriteBlog = (blogs) => {
  //Without LodAsh
  /*
  let maxLikes = -1
  let favorite = null
  blogs.forEach(blog => {
    if (blog.likes > maxLikes) {
      maxLikes = blog.likes
      favorite = blog
    }
  })
  */
  //Using LodAsh
  const favorite = lodash.maxBy(blogs, 'likes')

  //console.log('FAVORITE:', favorite)
  return {
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes
  }
}

const mostBlogs = (blogs) => {
  //console.log('BLOGS:', blogs)
  const authorCounts = lodash.countBy(blogs, 'author')
  //console.log('AUTHOR COUNTS:', authorCounts)
  //console.log('TO ARRAY lodash.keys:', lodash.keys(authorCounts))
  const topAuthor = lodash.maxBy(
    lodash.keys(authorCounts),
    (item) => authorCounts[item]
  )
  //console.log('TOP AUTHOR:', topAuthor)
  return {
    author: topAuthor,
    blogs: authorCounts[topAuthor]
  }
}

const mostLikes = (blogs) => {
  const blogsByAuthor = lodash.groupBy(blogs, 'author')
  //console.log('AUTHOR COUNTS:', authorCounts)

  //With Reduce
  /*const likesByAuthor = lodash.mapValues(blogsByAuthor,
    (authorBlogs => authorBlogs.reduce((acum, item) => acum + item.likes, 0)))
  */
  //With sumBy
  const likesByAuthor = lodash.mapValues(blogsByAuthor, (authorBlogs) =>
    lodash.sumBy(authorBlogs, 'likes')
  )
  //console.log('likes COUNTS:', likesByAuthor)

  const topAuthor = lodash.maxBy(
    lodash.keys(likesByAuthor),
    (item) => likesByAuthor[item]
  )
  //console.log('topAuthor:', topAuthor);
  return {
    author: topAuthor,
    likes: likesByAuthor[topAuthor]
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
