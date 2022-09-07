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

export default Course