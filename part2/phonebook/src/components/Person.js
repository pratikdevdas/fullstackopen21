import React from 'react'
// import Note from './Note'
const Person = ({filterSearch,removePerson}) =>{
 
    return (
     
      <div >
      {filterSearch.map(note => 
      <div key ={note.id}>
       {note.name} {note.number} <button onClick={() => removePerson(note.id, note.name)}>Delete</button>
        </div>
        )}</div>
   
 
       )
}

export default Person