import { useState } from 'react'

const Header = props => <h2>{props.text}</h2>

const Statistics = ({good, neutral, bad}) => {
	const computeTotal = (good,neutral,bad) => good+neutral+bad
	const computeAvg = (good, neutral, bad) => (good-bad)/computeTotal(good,neutral,bad)
	const computePos = (good, neutral, bad) => good/computeTotal(good,neutral,bad)*100
	return (
		<div>
			good {good}<br/>
			neutral {neutral}<br/>
			bad {bad}<br/>
			total {computeTotal(good,neutral,bad)}<br/>
			average {computeAvg(good,neutral,bad)}<br/>
			positive {computePos(good,neutral,bad)}	%<br/>		
		</div>
	)
}





const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
	
	const handleFeedback = (type) => {
		if (type === 'Good'){return setGood(good+1)}
		else if (type === 'Neutral'){return setNeutral(neutral+1)}
		else if (type === 'Bad'){return setBad(bad+1)}
	}

  return (
    <div>
      <Header text = 'give feedback'/>
	  <button onClick={()=>handleFeedback('Good')}>Good</button>
  	  <button onClick={()=>handleFeedback('Neutral')}>Neutral</button>
  	  <button onClick={()=>handleFeedback('Bad')}>Bad</button>
	  <Header text = 'statistics'/>
	  <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App