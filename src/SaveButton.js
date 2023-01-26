import React from 'react';

class SaveButton extends React.Component {

	render() {
		return (
			<button 
				onClick={() => this.props.onClick()}
				id="save-button" 
				className="btn btn-primary"
			>
			Save
			</button>
		);
	}
}

export default SaveButton;