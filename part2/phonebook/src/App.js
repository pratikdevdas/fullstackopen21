import React, { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Person from "./components/Person";
import herePerson from "./services/backend"
// import noteService from "./services/backend.js";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    console.log("effect");
   herePerson.getAll()
    .then(response => {
            setPersons(response);
            console.log(response)
    });
  }, []);
  // console.log("render", persons.length, "notes");

  const handleSearch = event => {
    setSearchTerm(event.target.value);
    //the event handler which that syncronizes the change made to input with component state
  };

  const addName = event => {
    event.preventDefault();
    const checkPerson = persons.some(k => k.name === newName);
    console.log(checkPerson);
    if (checkPerson === false) {
    const newObject = {
      name: newName,
      number: newNumber,
      };console.log(newObject)
          herePerson.create(newObject)
          .then(response=>{          
         setPersons(persons.concat(response));
      setNewName("");
      setNewNumber("");
          })
        }
    else {
      alert(`${newName} is already there`); 
      setPersons(persons.concat())
      setNewName("");
      setNewNumber("");}
      };

      const removePerson = (id, name) => {
        if (window.confirm(`delete ${name}?`)) {
          herePerson.remove(id)
          .then(() => {
            setPersons(persons.filter(person => person.id !== id));
            });
        } 
      };


  const handleNameChange = event => {
    // console.log(event.target.value);
    setNewName(event.target.value);
  };

  const handleNumberChange = event2 => {
    // console.log(event2.target.value);
    setNewNumber(event2.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter prop={searchTerm} prop2={handleSearch} />
      <h3>Add a new</h3>
      <PersonForm
        prop1={addName}
        prop2={newName}
        prop3={handleNameChange}
        prop4={newNumber}
        prop5={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Person prop={persons} prop2={searchTerm} prop3={removePerson}/>
    </div>
  );
};

export default App;
