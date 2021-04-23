import React, { useState } from 'react'

import Filter from'./components/Filter'
import PersonForm from './components/PersonForm'
import Person from './components/Person'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState([])
  const [searchTerm, setSearchTerm] = useState("");

 const handleChange = event => {
  setSearchTerm(event.target.value);
 
};

   const addName = (event) => {
    event.preventDefault()
    const noteObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
      }
      const result = persons.some((k) => k.name === newName );
      console.log(result)
     if (result === true)
     {alert(`${newName} is already there`)}
    setPersons(persons.concat(noteObject))
    setNewName('')
    setNewNumber('')
  }
  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event2) => {
    console.log(event2.target.value)
    setNewNumber(event2.target.value)
    
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter prop={searchTerm} prop2={handleChange}/>
      <h3>Add a new</h3>
      <PersonForm prop1={addName} prop2={newName} prop3={handleNameChange} prop4={newNumber} prop5={handleNumberChange} />
      <h2>Numbers</h2>
      <Person prop={persons} prop2={searchTerm}/>  
    </div>
  )
}

export default App