import React from 'react';

class SwapLanguageButton extends React.Component {

	render() {
		return (
			<button 
				onClick={() => this.props.onClick()}
				id="swap-button" 
				className="btn btn-primary"
			>
			Swap
			</button>
		);
	}
}

export default SwapLanguageButton;