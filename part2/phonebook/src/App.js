import React, { useState,useEffect } from 'react'
import axios from 'axios'
import Filter from'./components/Filter'
import PersonForm from './components/PersonForm'
import Person from './components/Person'
import noteService from './services/backend'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState([])
  const [ searchTerm, setSearchTerm] = useState("");
  const [ message, setMessage ] = useState(null);
  const [ final, setFinal ] = useState('');

  useEffect(() => {
    noteService
    .getAll()
    .then(initialPersons => {
      setPersons(initialPersons)
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
      noteService
      .create(noteObject)
      .then(personCreate => {
        console.log(personCreate)
      })
      const result = persons.some((k) => k.name === newName );
      console.log(result)
     if (result === true)
     {alert(`${newName} is already there`)}
    setPersons(persons.concat(noteObject))
    setNewName('')
    setNewNumber('')
  }

    //delete person
  const toggleRemove = (id, name) => {
    if (window.confirm(`Want to delete ${name} from phonebook?`)) {
      noteService
      .remove(id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== id));
        // setMessage(`Deleted ${name}`);
        // setFinal('info');
      });
    } 
  };
 
  
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
      <Person prop={persons} prop2={searchTerm} prop3={toggleRemove}/>  
    </div>
  )
}

export default App