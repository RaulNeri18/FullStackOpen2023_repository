import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNumbers] = useState('') 
  const [filterName, setFilterName] = useState('')
  
  const addPerson = (event) => {
    event.preventDefault()

    const exists = persons.some(person => person.name === newName)
    if(exists)
      alert(`${newName} is already added to phonebook`)
    else {
      //Add Name
      const newPerson = {name: newName, number: newNumber, id: persons.length + 1}
      setPersons(persons.concat(newPerson))
      setNewName('')
      setNumbers('')
    }
  }

  const personsFiltered = filterName === '' ? persons : persons.filter(person => person.name.toLowerCase().includes(filterName.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterName={filterName} onChangeFilter={(event) => setFilterName(event.target.value)} />

      <h3>Add a new</h3>
      <PersonForm submitForm={addPerson} 
          newName={newName} newNumber={newNumber} 
          onChangeName={(event) => setNewName(event.target.value)}
          onChangeNumber={(event) => setNumbers(event.target.value)} />

      <h3>Numbers</h3>
        <Persons personsFiltered={personsFiltered} />
    </div>
  )
}

export default App