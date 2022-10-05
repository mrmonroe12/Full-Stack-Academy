import Input from './Input'
import Button from './Button'

const PersonForm = (props)=>{
	return (
		<form>
		  <div>
		    name: <Input 
						value={props.newName}
					onChange={props.handleNameChange}/>
		  </div>
		<div>
		  number: <Input 
					value={props.newNumber}
					onChange={props.handleNumberChange}/>
		  <p>Format must be xxx-xxx-xxxx</p>
		</div>
		  <div>
		    <Button onClick={props.addName} text="add"/>
		  </div>
		</form>
	)
	
}

export default PersonForm