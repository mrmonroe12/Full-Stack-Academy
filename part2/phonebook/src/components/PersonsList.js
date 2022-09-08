import PersonInfo from './PersonInfo'

const PersonsList = ({persons, searchFilter})=>{
		return (
			<div>{
			persons
				.filter(person=>person.name.toLowerCase().indexOf(searchFilter.toLowerCase())>=0)
				.map(person=><PersonInfo person={person} key={person.id}/>)
		}</div>
		  )}
		  
export default PersonsList