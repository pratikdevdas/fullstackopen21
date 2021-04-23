import React from 'react'
const Filter = ({prop,prop2}) =>{return (<>
    <input
      type="text"
      placeholder="Search"
      value={prop}
      onChange={prop2}
    /></>)}
export default Filter