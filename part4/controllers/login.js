const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')
const config = require('../utils/config')

loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body
  const user = await User.findOne({ username })
  const passwordCorrect = user
    ? bcrypt.compare(password, user.passwordHash)
    : null

  if (!(user && passwordCorrect))
    response.status(401).json({ error: 'invalid username or password' })

  //Create Token
  const userForToken = {
    id: user._id,
    username: user.username
  }

  const token = jwt.sign(userForToken, config.SECRET, { expiresIn: 60 * 60 })

  response.status(200).send({ token, username: user.username, name: user.name })
})

module.exports = loginRouter