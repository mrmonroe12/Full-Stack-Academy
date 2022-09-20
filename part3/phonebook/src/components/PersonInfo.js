import Button from './Button'

const PersonInfo = ({person, clickHandler}) => {
	return (
		<p>{person.name} {person.number} <Button onClick={clickHandler} text='Delete Person'/></p>
	)
}

export default PersonInfo