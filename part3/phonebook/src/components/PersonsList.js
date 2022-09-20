import PersonInfo from './PersonInfo'
import personsService from '../services/persons'

const PersonsList = ({persons, searchFilter, setPersons})=>{
		
		const deletePersonId = (id) => {
			const persName = persons.find(person=>person.id===id).name
			
			
			if (window.confirm(`Are you sure you'd like to delete ${persName}'`)){
				personsService
					.del(id)
					.then(()=>{
						setPersons(
							persons.filter(p=>p.id!==id)
						)
					})
					.catch(error=>console.log(error))
			
				}
		}
		
		return (
			<div>
			{persons
				.filter(person=>person.name.toLowerCase().indexOf(searchFilter.toLowerCase())>=0)
				.map(person=>{
					return (
						<PersonInfo 
							person={person} 
							key={person.id} 
							clickHandler={()=>deletePersonId(person.id)}
						/>
					)
				})}
			</div>
		  )
	  }
		  
export default PersonsList