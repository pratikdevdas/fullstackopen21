import React from 'react'
import Note from './Note'
const Person = ({prop,prop2}) =>{
    return (<>{prop.filter(note => note.name.toLowerCase().includes(prop2.toLowerCase())).map(note => 
        <Note key={note.id} note={note} />
      )}</>)
}

export default Person