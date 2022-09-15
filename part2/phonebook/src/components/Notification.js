const Notification = ({type, message}) => {
	const successStyle = {
		color: 'green',
		fontSize: '20px',
		backgroundColor: 'lightgray',
		padding: '10px',
		borderStyle: 'solid',
		margin: '10px'
		
	}
	
	const errorStyle = {
		color: 'red',
		fontSize: '20px',
		backgroundColor: 'lightgray',
		padding: '10px',
		borderStyle: 'solid',
		margin: '10px'
		
	}
	
	if (message===null){
		return null
	}
	
	else if (type === 'success') {
		return (
		<div style={successStyle}>
			{message}
		</div>
		)
	}
	
	return (
	<div style={errorStyle}>
		{message}
	</div>
	)
	
}

export default Notification