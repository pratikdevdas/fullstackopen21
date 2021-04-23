import React from 'react'
const PersonForm = ({prop1,prop2,prop3,prop4,prop5}) =>{return (<><form onSubmit={prop1} >
    <div>
      name: <input value={prop2} onChange={prop3}/>
    </div>
    <div>
          number: <input value={prop4} onChange={prop5}/>
        </div>
        <div>
          
          <button type="submit">add</button>
        </div>
     </form></>)}

export default PersonForm