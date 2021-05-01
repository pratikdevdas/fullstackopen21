import React from 'react'

const Person = ({prop,prop2,prop3}) =>{
         const call = (note) => { prop3(note.id, note.name)}
    return (prop.length ?<div>
    
      {prop.filter(note => note.name.toLowerCase().includes(prop2.toLowerCase())).map(note => 
      <div>
       
          <div key ={note.id}>{note.name} {note.number} <button onClick={() => {prop3(note.id, note.name)}}> Delete</button> 
          </div></div>
        // <Note key={note.id} note={note} prop={prop3}/>
      )}</div>
      :
      
      <p>nare nare na</p>
      
      )
}

export default Person