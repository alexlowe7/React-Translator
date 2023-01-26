import React from 'react';

class ToggleButton extends React.Component {

	render() {
		return (
			<button 
				onClick={() => this.props.onClick(this.props.directionNext)}
				id="study-button" 
				className={`btn btn-sm btn-primary ${this.props.className}`}
				disabled={this.props.disabled}
			>
			{this.props.directionNext ? '>' : '<'}
			</button>
		);
	}
}

export default ToggleButton;