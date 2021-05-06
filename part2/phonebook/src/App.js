import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Person from "./components/Person";
import herePerson from "./services/backend"

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
    

    const checkPerson = persons.find(person => person.name === newName);
    console.log(checkPerson);

    if (!checkPerson) {
      const newPerson = {
        name: newName,
        number: newNumber,
        id : persons.length+1,
        }
        console.log(newPerson)
       herePerson.create(newPerson)
          .then(response=>{          
         setPersons(persons.concat(response));
            })
            setNewName("");
            setNewNumber("");
        }
        
        else {
          herePerson.update(checkPerson.id,{name: checkPerson.name,
            number: newNumber,
            })
          .then(response=>{ console.log(response)         
            setPersons(persons.map(person => person.name === response.name ? response : person))
          })
            
          setNewName("");
          setNewNumber("");
          }
  
   };

      const removePerson = (id, name) => {
        if (window.confirm(`delete ${name}?`)) {
          herePerson.remove(id,name)
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
  
  const filterSearch = persons.filter(note => note.name.toLowerCase().includes(searchTerm.toLowerCase()));
  
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
      <Person filterSearch={filterSearch} removePerson={removePerson}/>
    </div>
  );
};

export default App;