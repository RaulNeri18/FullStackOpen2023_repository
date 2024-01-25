const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()
const { GraphQLError } = require('graphql')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')
const jwt = require('jsonwebtoken')

const resolvers = {
    Query: {
      bookCount: async () => Book.collection.countDocuments(),
      authorCount: async () => Author.collection.countDocuments(),
      allBooks: async (root, args) => {
        let query = {};
  
        if (args.author) {
          const author = await Author.findOne({ name: args.author });
          query.author = author._id;
        }
  
        if (args.genre) {
          query.genres = args.genre;
        }
  
        return Book.find(query).populate('author');
      },
      allAuthors: async () => Author.find({}),
      me: (root, args, context) => context.currentUser,
    },
    Author: {
      bookCount: (root) => {
        //console.log('bookCount')
        return root.books.length
      }
    },
    Mutation: {
      addBook: async (root, args, context) => {
        const currentUser = context.currentUser
  
        if (!currentUser) {
          throw new GraphQLError('not authenticated', {
            extensions: {
              code: 'BAD_USER_INPUT',
            }
          })
        }
  
        let author = await Author.findOne({ name: args.author })
        if (!author) {
          const newAuthor = new Author({ name: args.author })
          author = await newAuthor.save()
            .catch(error => {
              throw new GraphQLError('Saving author failed', {
                extensions: {
                  code: 'BAD_USER_INPUT',
                  invalidArgs: args.author,
                  error
                }
              })
            })
        }
  
        const newBook = new Book({ ...args, author: author._id })        
        await newBook.save()
          .catch(error => {
            throw new GraphQLError('Saving book failed', {
              extensions: {
                code: 'BAD_USER_INPUT',
                invalidArgs: args.title,
                error
              }
            })
          })
        
        await newBook.populate('author')
        await Author.findByIdAndUpdate(author._id, { $push: { books: newBook._id } })

        pubsub.publish('BOOK_ADDED', { bookAdded: newBook })
        
        return newBook
      },
      editAuthor: async (root, args, context) => {
        const currentUser = context.currentUser
  
        if (!currentUser) {
          throw new GraphQLError('not authenticated', {
            extensions: {
              code: 'BAD_USER_INPUT',
            }
          })
        }
  
        const authorFound = await Author.findOne({ name: args.name })
  
        if (authorFound) {
          authorFound.born = args.setBornTo
  
          await authorFound.save()
            .catch(error => {
              throw new GraphQLError('Saving author failed', {
                extensions: {
                  code: 'BAD_USER_INPUT',
                  invalidArgs: args.author,
                  error
                }
              })
            })
          return authorFound
        }
  
        return null
      },
  
      createUser: async (root, args) => {
        const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })
    
        return user.save()
          .catch(error => {
            throw new GraphQLError('Creating the user failed', {
              extensions: {
                code: 'BAD_USER_INPUT',
                invalidArgs: args.username,
                error
              }
            })
          })
      },
      login: async (root, args) => {
        const user = await User.findOne({ username: args.username })
    
        if ( !user || args.password !== 'secret' ) {
          throw new GraphQLError('wrong credentials', {
            extensions: {
              code: 'BAD_USER_INPUT'
            }
          })        
        }
    
        const userForToken = {
          username: user.username,
          id: user._id,
        }
    
        return { 
          token: jwt.sign(userForToken, process.env.JWT_SECRET),
          favoriteGenre: user.favoriteGenre
        }
      },
    },
    Subscription: {
      bookAdded: {
        subscribe: () => pubsub.asyncIterator('BOOK_ADDED')
      },
    },
  }

  module.exports = resolvers