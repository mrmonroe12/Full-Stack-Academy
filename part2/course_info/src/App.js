const Course = ({course}) => {
	return (
		<> 
		<Header course={course}/>
		<Content parts={course.parts}/>
		<Total parts={course.parts}/>
  		</>  
	)
}

const Header = ({ course }) => <h1>{course.name}</h1>

const Total = ({ parts }) => <b>total of {parts.reduce((previousValue, currentValue)=>previousValue+currentValue.exercises,0,)} exercises</b>

const Part = ({ part }) => <p>{part.name} {part.exercises}</p>

const Content = ({ parts }) => <>{parts.map(part => <Part key={part.id} part={part}/>)}</>

const App = () => {
	
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return <>{courses.map(course=><Course key={course.id} course={course} />)}</>
}

export default App