import React from 'react';

class SaveButton extends React.Component {

	render() {
		return (
			<button 
				onClick={() => this.props.onClick()}
				id="study-button" 
				className="btn btn-primary"
			>
			Study
			</button>
		);
	}
}

export default SaveButton;