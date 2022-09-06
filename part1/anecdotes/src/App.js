import { useState } from 'react'

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
   
  const [selected, setSelected] = useState(0)
  
  const addVote = () => {
  	const newPoints = [...points]
	newPoints[selected] = newPoints[selected]+1
	setPoints(newPoints)    
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
      <p>{anecdotes[selected]}</p>
	  <p>has {points[selected]} votes</p>
	  <button onClick = {()=>addVote()}>Vote for this one</button>
	  <button onClick = {()=>getRand(anecdotes.length)}>Randomize Quote</button>
    </div>
  )
}

export default App