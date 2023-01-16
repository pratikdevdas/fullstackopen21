
const Header = ({ courseName } : {courseName : string}) => {
  return (
    <div>{courseName}</div>
  )
}

interface CoursePartBase{
  name: string;
  exerciseCount: number;
}
interface CoursePartOne extends CoursePartBase{
  name: 'Fundamentals';
  description: string;
}
interface CoursePartTwo extends CoursePartBase{
  name: 'Using props to pass data';
  groupProjectCount: number;
}

interface CoursePartThree extends CoursePartBase{
  name: 'Deeper type usage';
  description: string;
  exerciseSubmissionLink: string;
}

type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree;

const Content = ({ courseParts } : {courseParts: Array<CoursePart>}) => {
  return (
    <div>{courseParts.map((n, i) => <div key={i}>
      <li >{n.name} {n.exerciseCount}</li>
    </div>
    )}</div>
  )
}

const Total = ({ courseParts } : {courseParts : CoursePart[]}) => {
  return (
    <div>
      <p>
        Number of exercises
        {courseParts.reduce((acc, crr) => acc + crr.exerciseCount, 0)}
      </p>
    </div>
  )
}
function App() {
  const courseName = 'Half Stack app dev'
  const courseParts: CoursePart[] =  [
    {
      name: 'Fundamentals',
      exerciseCount: 10,
      description: 'This is an awesome course part'
    },
    {
      name: 'Using props to pass data',
      exerciseCount: 7,
      groupProjectCount: 3
    },
    {
      name: 'Deeper type usage',
      exerciseCount: 14,
      description: 'Confusing description',
      exerciseSubmissionLink: 'https://fake-exercise-submit.made-up-url.dev'
    }
  ]

  /* Once you have either explicitly declared or TypeScript has inferred that a variable is of type union and that each type in the type union contains a certain attribute, we can use that as a type identifier. We can then build a switch case around that attribute and TypeScript will know which attributes are available within each case block. */
  courseParts.forEach(part => {
    switch (part.name){
    case 'Fundamentals':
      break
    case 'Using props to pass data':
      console.log(part.groupProjectCount)
      break
    case 'Deeper type usage':
      console.log(part.description)
      break
    default:
      return assertNever(part)
    }
  })

  // exhaustive type checking in default block
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    )
  }
  /* In the above example, TypeScript knows that a part has the type CoursePart. It can then infer that part is of either type CoursePartOne, CoursePartTwo or CoursePartThree. The name is distinct for each type, so we can use it to identify each type and TypeScript can let us know which attributes are available in each case block. Then, TypeScript will produce an error if you try to use the part.description within the "Using props to pass data" block for example. */

  return (
    <div className="App">
      <Header courseName={courseName}/>
      <Content courseParts={courseParts}/>
      <Total courseParts={courseParts}/>
    </div>
  )
}

export default App
