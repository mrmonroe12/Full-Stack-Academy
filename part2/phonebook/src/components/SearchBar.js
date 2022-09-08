import Input from './Input.js'

const SearchBar = (props)=>{
	return (
		<div>
	  		search by name containing: 
			<Input
				value={props.searchFilter}
				onChange={props.handleSearchFilter}/>
		</div>
	)
}

export default SearchBar