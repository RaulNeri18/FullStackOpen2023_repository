import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import ServicePerson from './services/ServicePerson'

const App = () => {
  const [persons, setPersons] = useState([])

  useEffect(() => {
    ServicePerson.getAll()
        .then(listPersons => setPersons(listPersons))
        .catch(error => console.log("Error getting person:", error))
  }, [])

  const [newName, setNewName] = useState('')
  const [newNumber, setNumbers] = useState('') 
  const [filterName, setFilterName] = useState('')
  
  const submitPerson = (event) => {
    event.preventDefault()

    const existingPerson = persons.find(person => person.name === newName)
    if(existingPerson) {
      const updateNumber = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
      if(updateNumber) {
        const updatedPerson = {...existingPerson, number: newNumber}
        handleUpdate(updatedPerson)
      }
    } else {
      const newPerson = {name: newName, number: newNumber}
      handleInsert(newPerson)
    }
  }

  const personsFiltered = filterName === '' ? persons : persons.filter(person => person.name.toLowerCase().includes(filterName.toLowerCase()))
  const clearInputs = () => {
    setNewName('')
    setNumbers('')
  }

  const handleInsert = (newPerson) => {
    ServicePerson.insertPerson(newPerson)
    .then(personinserted => {
      setPersons(persons.concat(personinserted))
      clearInputs()
    }).catch(error => console.log("Error inserting person:", error))

  }

  const handleUpdate = (updatedPerson) => {
    ServicePerson.updatePerson(updatedPerson.id, updatedPerson)
    .then(personupdated => {
      setPersons(persons.map(person => person.id !== updatedPerson.id ? person : personupdated))
      clearInputs()
    }).catch(error => console.log("Error updating person:", error))
  }

  const handleDelete = (id, name) => {
    if(confirm(`Delete ${name} ?`))
    {
      ServicePerson.deletePerson(id)
      .then(statusCode => {
        const allowedStatusCodes = [200, 202, 204];
        if(allowedStatusCodes.includes(statusCode)){
          setPersons(persons.filter(person => person.id !== id))
        } else 
          console.log("Error deleting person.");
      }).catch(error => console.log("Error deleting person:", error))
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterName={filterName} onChangeFilter={(event) => setFilterName(event.target.value)} />

      <h3>Add a new</h3>
      <PersonForm submitForm={submitPerson} 
          newName={newName} newNumber={newNumber} 
          onChangeName={(event) => setNewName(event.target.value)}
          onChangeNumber={(event) => setNumbers(event.target.value)} />

      <h3>Numbers</h3>
        <Persons personsFiltered={personsFiltered} handleDelete={handleDelete}/>
    </div>
  )
}

export default App