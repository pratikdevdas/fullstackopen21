import React from "react";

const Header = ({ course1 }) => {
  return <h1>{course1}</h1>;
};

const Total = ({ course2 }) => {
  const reducer = ((accumulator, currentValue) => accumulator + currentValue.exercises);
  const k = course2.reduce(reducer,0)// a zero to be put because reduce uses the first value in the array if no initial value is provided, which is in this case was an object, try adding an initial value 0  to the reduce function
  console.log(k);
  return <p>Total = {k} </p>;
};

const Part = ({part,ex}) => {
  return (
    <p>
      {part} {ex}
    </p>
  );
};

const Content = ({ par }) => {
  const d= par.map(par=>par.name)
  console.log(d)
  return (
    <div>
    {par.map(par => {
      return(
         <Part  ex={par.exercises} part={par.name} />) 
    })}
    </div>
  );
};

const Course = ({c}) => {
  return (
    <>
      <Header course1={c.name} />
      <Content par={c.parts}/>
        <Total course2={c.parts}/>   
    </>
  );
};

export default Course;
