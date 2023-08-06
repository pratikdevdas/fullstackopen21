const Header = ({ courseName }: { courseName: string }) => {
  return <div>{courseName}</div>
}

interface CoursePartBase {
  name: string
  exerciseCount: number
  type: string
}

interface CourseNormalPart extends CoursePartBase, CourseDescriptionPart {
  type: 'normal'
}

interface CourseDescriptionPart extends CoursePartBase {
  description: string
}

interface CourseRequirementPart extends CoursePartBase, CourseDescriptionPart {
  type: 'special'
  requirements: string[]
}
interface CourseProjectPart extends CoursePartBase {
  type: 'groupProject'
  groupProjectCount: number
}

interface CourseSubmissionPart extends CoursePartBase, CourseDescriptionPart {
  type: 'submission'
  exerciseSubmissionLink: string
}

type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseRequirementPart

const courseParts: CoursePart[] = [
  {
    name: 'Fundamentals',
    exerciseCount: 10,
    description: 'This is the easy course part',
    type: 'normal',
  },
  {
    name: 'Advanced',
    exerciseCount: 7,
    description: 'This is the hard course part',
    type: 'normal',
  },
  {
    name: 'Using props to pass data',
    exerciseCount: 7,
    groupProjectCount: 3,
    type: 'groupProject',
  },
  {
    name: 'Deeper type usage',
    exerciseCount: 14,
    description: 'Confusing description',
    exerciseSubmissionLink: 'https://fake-exercise-submit.made-up-url.dev',
    type: 'submission',
  },
  {
    name: 'Backend development',
    exerciseCount: 21,
    description: 'Typing the backend',
    requirements: ['nodejs', 'jest'],
    type: 'special'
  }
]

// eslint-disable-next-line react/prop-types, @typescript-eslint/no-explicit-any
const Part = ({ part }: { part: CoursePart }) => {
  console.log(part.type)
  switch (part.type) {
  case 'normal':
    return (
      <div>
        <strong>
          {part.name} {part.exerciseCount}</strong>
        <div>{part.description}</div>
      </div>
    )
  case 'groupProject':
    return (
      <div>
        <strong>
          {part.name} {part.exerciseCount}
        </strong>
        <div>{part.groupProjectCount}</div>
      </div>
    )
  case 'submission':
    return (
      <div>
        <strong>
          {part.name} {part.exerciseCount}
        </strong>
        <div>{part.description}</div>
        <div>{part.exerciseSubmissionLink}</div>
      </div>
    )
  case 'special':
    return (
      <div>
        <strong>
          {part.name} {part.exerciseCount}
        </strong>
        <div>{part.description}</div>
        <div>requirement: {part.requirements.map((n, i) => <span key={i}>{n},</span>)}</div>
      </div>
    )
  default:
    return null
  }
}

const Content = ({ courseParts }: { courseParts: Array<CoursePart> }) => {
  return (
    <div>
      {courseParts.map((part, i) => (
        <Part part={part} key={i} />
      ))}
    </div>
  )
}

const Total = ({ courseParts }: { courseParts: CoursePart[] }) => {
  return (
    <div>
      <p>
        Number of exercises
        {courseParts.reduce((acc, crr) => acc + crr.exerciseCount, 0)}
      </p>
    </div>
  )
}

function App(): JSX.Element {
  const courseName = 'Half Stack app dev'
  return (
    <div className="App">
      <Header courseName={courseName} />
      <Content courseParts={courseParts} />
      <Total courseParts={courseParts} />
    </div>
  )
}

export default App
