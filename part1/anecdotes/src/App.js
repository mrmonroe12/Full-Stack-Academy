import { useState } from 'react'

const AnecdoteBlock = ({type, anecdote, votes}) => {
	
	let text = ""
	if (type === 'top'){
		text = "Anecdote with the most votes"
	} else {
		text = "Anecdote of the day"
	}
	return (
		<div>
			<h2>{text}</h2>
	  		<p>{anecdote}</p>
	  		<p>has {votes} votes</p>
		</div>
	)
	
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
  
  const [points,setPoints] = useState([0,0,0,0,0,0,0])
   
  const [selected, setSelected] = useState(Math.floor(Math.random() * anecdotes.length))
  
  const [mostPop, setMostPop] = useState(selected)
  
  const addVote = () => {
	console.log(mostPop)
  	const newPoints = [...points]
	newPoints[selected] = newPoints[selected]+1
	setPoints(newPoints)
	console.log("newPoints: "+newPoints[selected]+" mostPopPoints: "+newPoints[mostPop])
	
	  if (newPoints[selected] > newPoints[mostPop]){
	  	setMostPop(selected)
	  }    
  }

  const getRand = (anecdotes) => {
	  /*if you randomize you want a new number so continue until not matching current*/
	  let newSelected = Math.floor(Math.random() * anecdotes)
	  while (newSelected === selected){
	  	newSelected = Math.floor(Math.random() * anecdotes)
	  }
	  setSelected(newSelected)
  }
  return (
    <div>
      <AnecdoteBlock anecdote={anecdotes[selected]} votes={points[selected]}/>
	  <button onClick = {()=>addVote()}>Vote for this one</button>
	  <button onClick = {()=>getRand(anecdotes.length)}>Randomize Quote</button>
	  <AnecdoteBlock type = 'top' anecdote={anecdotes[mostPop]} votes={points[mostPop]}/>
    </div>
  )
}

export default App