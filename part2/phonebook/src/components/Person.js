import React from 'react'
// import Note from './Note'
const Person = ({prop,prop2,prop3}) =>{
          
    return (<div >
    
      {prop.filter(note => note.name.toLowerCase().includes(prop2.toLowerCase())).map(note => 
      <div key ={note.id}>
       {note.name} {note.number} <button onClick={() => prop3(note.id, note.name)}>Delete</button>
        </div>
        )}</div>
 
       )
}

export default Person