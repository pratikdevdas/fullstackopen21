import React from 'react'

const Note = ({note,prop}) => {
  
    return(<><div>{note.name} {note.number} <button onClick={prop}> Delete</button> </div></>)
  }

  export default Note