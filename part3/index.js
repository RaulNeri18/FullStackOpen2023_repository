const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
require('dotenv').config()

const app = express()
const Person = require('./models/person')

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(express.json())
app.use(requestLogger)
app.use(express.static('dist')) //To handle static files 
app.use(cors())

app.use(morgan(function (tokens, request, response) {
    return [
      tokens.method(request, response),
      tokens.url(request, response),
      tokens.status(request, response),
      tokens.res(request, response, 'content-length'), '-',
      tokens['response-time'](request, response), 'ms',
      JSON.stringify(request.body)
    ].join(' ')
}))


app.get('/', (request, response) => {
    response.send('<h1>BackEnd Persons</h1>')    
})

app.get('/info', (request, response, next) => {
  const currentDate = new Date()
  Person.find({}).then(persons => {
    response.send(`<p>Phonebook has info for ${persons.length} people</p><p>${currentDate}</p>`)
  })
  .catch(error => next(error))
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    //console.log(persons);
    response.json(persons)
  })
})

app.get('/api/persons/:id', (request, response, next) => {
  //console.log('ID', request.params.id);
  Person.findById(request.params.id).then(person => {
    if (person)
      response.json(person)
    else
      response.status(404).end()
  }).catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  //console.log('ID', request.params.id)
  Person.findByIdAndDelete(request.params.id).then(result => {
    response.status(204).end()
  })
  .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body

  if (!body.name || !body.number)
      return response.status(400).json({ 
          error: 'The name or number is missing' 
      })

  Person.find({}).then(persons => 
    {
      const nameExist = persons.find(person => person.name.toLowerCase() === body.name.toLowerCase())
      //console.log('FIND PERSON:', nameExist);
      if(nameExist)
        return response.status(400).json({
            error: 'The name already exists in the phonebook'
      })

      const newPerson = new Person({
        name: body.name, 
        number: body.number
      })
      
      newPerson.save().then(savedPerson => {
        response.json(savedPerson)
      })
      .catch(error => next(error))
    })  
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const person = {
    name: body.name,
    number: body.number
  }

  Person.findByIdAndUpdate(request.params.id, person, { new: true})
  .then(updatedPerson => {
    response.json(updatedPerson)
  })
  .catch(error => next(error))
})

app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})