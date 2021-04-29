import React, { useState,useEffect } from 'react'
import axios from 'axios'
import Filter from'./components/Filter'
import PersonForm from './components/PersonForm'
import Person from './components/Person'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState([])
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])
  console.log('render', persons.length, 'notes')

 const handleSearch = event => {
  setSearchTerm(event.target.value);
 //the event handler which that syncronizes the change made to input with component state
};

   const addName = (event) => {
    event.preventDefault()
    const noteObject = {
      name: newName,
      number: newNumber,
     
      }
      axios
      .post('http://localhost:3001/notes', noteObject)
      .then(response => {
        console.log(response)
      })
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
      <Filter prop={searchTerm} prop2={handleSearch}/>
      <h3>Add a new</h3>
      <PersonForm prop1={addName} prop2={newName} prop3={handleNameChange} prop4={newNumber} prop5={handleNumberChange} />
      <h2>Numbers</h2>
      <Person prop={persons} prop2={searchTerm}/>  
    </div>
  )
}

export default App