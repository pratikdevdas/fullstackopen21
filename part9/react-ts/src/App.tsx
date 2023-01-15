
const Header = ({ courseName } : {courseName : string}) => {
  return (
    <div>{courseName}</div>
  )
}

interface CoursePartOne{
  name: 'Fundamentals';
  exerciseCount: number;
  description: string;
}
interface CoursePartTwo{
  name: 'Using props to pass data';
  exerciseCount: number;
  groupProjectCount: number;
}
interface CoursePartThree{
  name: 'Deeper type usage';
  exerciseCount: number;
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

  return (
    <div className="App">
      <Header courseName={courseName}/>
      <Content courseParts={courseParts}/>
      <Total courseParts={courseParts}/>
    </div>
  )
}

export default App
