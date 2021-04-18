import React from 'react'
import ReactDOM from 'react-dom'


const Header = (first) => {
  return(
    <div><h1>{first.top}</h1></div>
    //{parameter.whatever is called in /APP} syntax for passing props
    // called from app first const variable
  )
}
const Part = (second) => {
  return(<div>
     <p>{second.mid} {second.exercises1}</p>
  <p>{second.mid2} {second.exercises2}</p>
  <p>{second.mid3} {second.exercises3}</p>
  </div>)
}
const Content = (nd) => {
  return(<div>
  <Part mid = {nd.mid} exercises1 = {nd.exercises1}/>
  <Part mid2 = {nd.mid2} exercises2 = {nd.exercises2}/>
  <Part mid3 = {nd.mid3} exercises3 = {nd.exercises3}/>
  </div>
  
  )
}
const Total = (third) => {
  return (<div>Number of exercises {third.bottom} </div>

  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  return (
        <>
        <Header top = {course.name}/>
           <Content mid = {course.parts[0].name} mid2 = {course.parts[1].name} mid3 = {course.parts[2].name} 
           exercises1 = {course.parts[0].exercises} exercises2 ={course.parts[1].exercises} exercises3 ={course.parts[2].exercises}/>
          <Total bottom = {course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises}/>   
        </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))