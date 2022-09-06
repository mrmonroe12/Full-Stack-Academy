import { useState } from 'react'

const Header = props => <h2>{props.text}</h2>

const Button = ({func, type}) => {
	return (
		<button onClick={func}>{type}</button>
	)
}

const Statline = ({text, value}) => {
	return (
		<tr>
		  <td>{text}</td>
		  <td>{value}</td>
		</tr>
	)
}

const Statistics = ({good, neutral, bad}) => {
	const computeTotal = (good,neutral,bad) => good+neutral+bad
	const computeAvg = (good, neutral, bad) => (good-bad)/computeTotal(good,neutral,bad)
	const computePos = (good, neutral, bad) => good/computeTotal(good,neutral,bad)*100
	if (computeTotal(good,neutral,bad)===0){
		return (
			<div>No feedback given</div>
		)
	} else {
	return (
		<table>
		  <tbody>
			<Statline text="Good" value = {good}/>
			<Statline text="Neutral" value = {neutral}/>
			<Statline text="Bad" value = {bad}/>
			<Statline text="Total" value = {computeTotal(good,neutral,bad)}/>
			<Statline text="Average" value = {computeAvg(good,neutral,bad)}/>
			<Statline text="Positive" value = {computePos(good,neutral,bad)}/>
		  </tbody>		
		</table>
	)
	}
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
	  <Button func={()=>handleFeedback('Good')} type = 'Good'/>
	  <Button func={()=>handleFeedback('Neutral')} type = 'Neutral'/>
	  <Button func={()=>handleFeedback('Bad')} type = 'Bad'/>
	  <Header text = 'statistics'/>
	  <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App