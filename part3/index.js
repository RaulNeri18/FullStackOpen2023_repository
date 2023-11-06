const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const app = express()

app.use(express.json())
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
  
let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/', (request, response) => {
    response.send('<h1>BackEnd Persons</h1>')    
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/info', (request, response) => {
    const currentDate = new Date()
    response.send(`<p>Phonebook has info for ${persons.length} people</p><p>${currentDate}</p>`)
})

app.get('/api/persons/:id', (request, response) => {
    const person = persons.find(person => person.id === Number(request.params.id))
    console.log(person);
    if (person)
        response.json(person)
    else    
        response.status(404).end()
})

app.delete('/api/persons/:id', (request, response) => {
    persons = persons.filter(person => person.id !== Number(request.params.id))
    response.status(204).end()
})

const generateRandomId = () => {
    const min = 1;
    const max = 10000;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name || !body.number)
        return response.status(400).json({ 
            error: 'The name or number is missing' 
        })

    const nameExist = persons.some(person => person.name.toLowerCase() === body.name.toLowerCase())
    if(nameExist)
        return response.status(400).json({
            error: 'The name already exists in the phonebook'
        })

    const newPerson = {
        "id": generateRandomId(),
        "name": body.name, 
        "number": body.number
    }
    
    persons = persons.concat(newPerson)
    response.json(newPerson)
})

const PORT = process.env.PORT || 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)