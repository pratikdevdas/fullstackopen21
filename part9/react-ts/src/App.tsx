
const Header = ({ courseName } : {courseName : string}) => {
  return (
    <div>{courseName}</div>
  )
}

interface Course{
  name: string,
  exerciseCount: number
}

const Content = ({ courseParts } : {courseParts: Array<Course>}) => {
  return (
    <div>{courseParts.map((n, i) => <div key={i}>
      <li >{n.name} {n.exerciseCount}</li>
    </div>
    )}</div>
  )
}


const Total = ({ courseParts } : {courseParts : Course[]}) => {
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
  const courseParts = [
    {
      name: 'Fundamentals',
      exerciseCount: 10,
    },
    {
      name: 'Using props to pass data',
      exerciseCount: 7,
    },
    {
      name: 'Deeper type usage',
      exerciseCount: 14,
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
