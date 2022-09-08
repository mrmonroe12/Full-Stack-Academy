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
		</div>
		  <div>
		    <Button type="submit" onClick={props.addName} text="add"/>
		  </div>
		</form>
	)
	
}

export default PersonForm